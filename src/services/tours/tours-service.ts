import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ApiResponseWrapper, ArrayApiResponse, SingleApiResponse } from '../../types/api'
import LocalDatabaseService from '../local-database-service'
import { TourStatusType } from '../../enums/tour-status-type'

export default class ToursService extends APIService {
  private prefix: string = 'tours'
  private localDatabaseService: LocalDatabaseService

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
    this.localDatabaseService = new LocalDatabaseService()
  }

  public async findAll (): Promise<ArrayApiResponse<Tour>> {
    const result = await this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      Tour
    )

    return this.handleTourListResult(result)
  }

  public async findOne (id: string): Promise<SingleApiResponse<Tour>> {
    const localTour = await this.localDatabaseService.getOne(id)
    // no need to make an api call if the tour was only created locally
    if (localTour?.status === TourStatusType.CREATED) {
      const wrapper = this.getSuccessWrapper('got data from local database')
      return { content: localTour, ...wrapper }
    }

    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )

    return this.handleGetOneResult(result, id, localTour)
  }

  public async create (tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
    return this.handleTourAddResult(tour, result)
  }

  public async update (id: string, tour: UpdateOrCreateTour): Promise<SingleApiResponse<unknown>> {
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
    return this.handleTourUpdateResult(result, id, tour)
  }

  public async delete (id: string): Promise<SingleApiResponse<unknown>> {
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
    return this.handleTourDeleteResult(result, id)
  }

  private async handleTourDeleteResult (result: SingleApiResponse<unknown>, id: string): Promise<SingleApiResponse<unknown>> {
    const localTour = await this.localDatabaseService.getOne(id)
    if (ToursService.isOffline(result.statusCode)) {
      await this.localDatabaseService.markTourAsDeleted(localTour!)
      return { ...this.getSuccessWrapper('marked tour as deleted in local database') }
    }
    await this.localDatabaseService.deleteTour(id)
    return result
  }

  private async handleTourUpdateResult (result: SingleApiResponse<unknown>, tourId: string, tour: UpdateOrCreateTour): Promise<SingleApiResponse<unknown>> {
    const localTour = await this.localDatabaseService.getOne(tourId)

    if (ToursService.isOffline(result.statusCode)) {
      let updatedTour
      if (!localTour) { // todo: will this ever happen?
        updatedTour = this.localDatabaseService.createLocalTour(tour)
      } else {
        updatedTour = this.localDatabaseService.updateLocalTour(localTour, tour)
      }
      await this.localDatabaseService.putTour(updatedTour)
      return { ...this.getSuccessWrapper('updated tour in local database') }
    }

    if (localTour) {
      localTour.status = TourStatusType.SYNCED
      await this.localDatabaseService.putTour(localTour)
    }

    return result
  }

  private async handleGetOneResult (result: SingleApiResponse<Tour>, tourId: string, localTour: Tour|undefined): Promise<SingleApiResponse<Tour>> {
    if (ToursService.isOffline(result.statusCode)) {
      if (localTour) {
        return this.getLocalTourResponse(localTour, 'got data from local database')
      } else { // tour could not be found in local database
        result.statusCode = 404
        result.statusMessage = 'Could not find tour'
        return result
      }
    }

    if (result.statusCode === 404) {
      if (localTour) {
        return this.handleTourNotFoundStatus(tourId)
      }
    }

    return this.handleGetTour(result, localTour)
  }

  private static isOffline (statusCode: number): boolean {
    return statusCode === 500
  }

  private async handleGetTour (result: SingleApiResponse<Tour>, localTour: Tour | undefined): Promise<SingleApiResponse<Tour>> {
    if (result.statusCode === 200) {
      if (localTour!.status === TourStatusType.SYNCING) {
        return result
      } else if (localTour!.status !== TourStatusType.SYNCED) {
        // serve local tour assuming these are the most recent changes
        result.content = localTour
      }
      // only update the tour in the database if it was already synced
      // otherwise we could overwrite local changes!
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private async handleTourNotFoundStatus (tourId: string): Promise<SingleApiResponse<Tour>> {
    await this.localDatabaseService.deleteTour(tourId)
    const wrapper = this.createResponseWrapper(false, 404, 'Tour was deleted in database. Removing local copy.')
    return { ...wrapper }
  }

  private async getLocalTourResponse (localTour: Tour, message: string): Promise<SingleApiResponse<Tour>> {
    const wrapper = this.getSuccessWrapper(message)
    return { content: localTour, ...wrapper }
  }

  private getSuccessWrapper (message: string): ApiResponseWrapper {
    return this.createResponseWrapper(true, 200, message)
  }

  private async handleTourAddResult (tour: UpdateOrCreateTour, result: SingleApiResponse<Tour>): Promise<SingleApiResponse<Tour>> {
    if (ToursService.isOffline(result.statusCode)) {
      const wrapper = this.getSuccessWrapper('added data to local database')
      const localTour = this.localDatabaseService.createLocalTour(tour)
      await this.localDatabaseService.putTour(localTour)
      return { content: localTour, ...wrapper }
    } else if (result.statusCode === 201) {
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private async handleTourListResult (result: ArrayApiResponse<Tour>): Promise<ArrayApiResponse<Tour>> {
    if (ToursService.isOffline(result.statusCode)) {
      const wrapper = this.getSuccessWrapper('serve data from local database')
      const tours = await this.localDatabaseService.findAllTours()
      return { content: tours, ...wrapper }
    } else {
      if (!result.content) {
        result.content = []
      }
      await this.localDatabaseService.addTourList(result.content)
      result.content = await this.localDatabaseService.findAllTours() // todo: needs error handling as it sometimes can happen that the local db throws an error (eg Firefox private mode)
      return result
    }
  }
}

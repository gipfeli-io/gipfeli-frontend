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

  public async findOne (id: string | undefined): Promise<SingleApiResponse<Tour>> {
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

  public async update (id: string | undefined, tour: UpdateOrCreateTour): Promise<SingleApiResponse<unknown>> {
    const localTour = await this.localDatabaseService.getOne(id)
    // no need to make an api call if the tour was only created locally
    if (localTour?.status === TourStatusType.CREATED) {
      return this.handleLocalTourUpdate(localTour, tour)
    }

    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
    return this.handleTourUpdateResult(result, tour, localTour)
  }

  public async delete (id: string): Promise<SingleApiResponse<unknown>> {
    const localTour = await this.localDatabaseService.getOne(id)
    // no need to call api if tour was created locally and is not synced
    if (localTour && localTour.status === TourStatusType.CREATED) {
      await this.localDatabaseService.deleteTour(id)
      return { ...this.getSuccessWrapper('successfully deleted tour') }
    }

    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
    return this.handleTourDeleteResult(result, localTour!)
  }

  private async handleTourDeleteResult (result: SingleApiResponse<unknown>, localTour: Tour): Promise<SingleApiResponse<unknown>> {
    if (ToursService.isOffline(result.statusCode, result.statusMessage)) {
      await this.localDatabaseService.markTourAsDeleted(localTour)
      return { ...this.getSuccessWrapper('marked tour as deleted in local database') }
    }
    // todo: error handling if status code is > 200 => treat 404 special.
    // if error != 404 => revive entry and show notification to user if entry marked as "DELETED" => we will be in process of syncing
    await this.localDatabaseService.deleteTour(localTour.id)
    return result
  }

  private async handleTourUpdateResult (result: SingleApiResponse<unknown>, tour: UpdateOrCreateTour, localTour: Tour | undefined): Promise<SingleApiResponse<unknown>> {
    if (ToursService.isOffline(result.statusCode, result.statusMessage)) {
      return this.handleLocalTourUpdate(localTour, tour)
    }
    // todo handle 404 => remove entry from db and show notification to user
    // todo: handle every other error and notify user

    const updatedTour = this.localDatabaseService.updateLocalTour(localTour!, tour, TourStatusType.SYNCED)
    await this.localDatabaseService.putTour(updatedTour)

    return result
  }

  private async handleLocalTourUpdate (localTour: Tour | undefined, tour: UpdateOrCreateTour): Promise<SingleApiResponse<unknown>> {
    const updatedTour = this.localDatabaseService.updateLocalTour(localTour!, tour, TourStatusType.UPDATED)
    await this.localDatabaseService.putTour(updatedTour)
    return { ...this.getSuccessWrapper('updated tour in local database') }
  }

  private async handleGetOneResult (result: SingleApiResponse<Tour>, tourId: string | undefined, localTour: Tour|undefined): Promise<SingleApiResponse<Tour>> {
    if (ToursService.isOffline(result.statusCode, result.statusMessage)) {
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

  private static isOffline (statusCode: number, statusMessage: string): boolean {
    return statusCode === 500 && statusMessage === 'Failed to fetch'
  }

  private async handleGetTour (result: SingleApiResponse<Tour>, localTour: Tour | undefined): Promise<SingleApiResponse<Tour>> {
    if (result.statusCode === 200) {
      if (localTour?.status === TourStatusType.SYNCING) {
        return result
      } else if (localTour?.status !== TourStatusType.SYNCED) {
        // serve local tour assuming these are the most recent changes
        result.content = localTour
      }
      // only update the tour in the database if it was already synced
      // otherwise we could overwrite local changes!
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private async handleTourNotFoundStatus (tourId: string | undefined): Promise<SingleApiResponse<Tour>> {
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
    // todo: do some error handling here as well
    if (ToursService.isOffline(result.statusCode, result.statusMessage)) {
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
    if (ToursService.isOffline(result.statusCode, result.statusMessage)) {
      return result
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

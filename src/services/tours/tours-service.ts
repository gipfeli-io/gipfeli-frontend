import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ArrayApiResponse, SingleApiResponse } from '../../types/api'
import LocalDatabaseService from '../local-database-service'
import { TourStatusType } from '../../enums/tour-status-type'
import { isOfflineResultMessage } from '../../utils/offline-helper'

export default class ToursService extends APIService {
  private prefix: string = 'tours'
  private localDatabaseService: LocalDatabaseService

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
    this.localDatabaseService = new LocalDatabaseService(token)
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
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )
    return this.handleGetOneResult(result, id)
  }

  public async create (tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
    return this.handleTourAddResult(result, tour)
  }

  public async update (id: string | undefined, tour: UpdateOrCreateTour): Promise<SingleApiResponse<void>> {
    const result: SingleApiResponse<void> = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
    return this.handleTourUpdateResult(result, tour, id)
  }

  public async delete (id: string): Promise<SingleApiResponse<void>> {
    const result: SingleApiResponse<void> = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
    return this.handleTourDeleteResult(result, id)
  }

  private async handleTourDeleteResult (result: SingleApiResponse<void>, id: string): Promise<SingleApiResponse<void>> {
    const localTour = await this.localDatabaseService.getOne(id)
    if (!isOfflineResultMessage(result.statusCode, result.statusMessage) && localTour) {
      await this.localDatabaseService.deleteTour(localTour.id)
    }
    return result
  }

  private async handleTourUpdateResult (result: SingleApiResponse<void>, tour: UpdateOrCreateTour, id: string | undefined): Promise<SingleApiResponse<void>> {
    if (!isOfflineResultMessage(result.statusCode, result.statusMessage)) {
      await this.localDatabaseService.update(id, tour, TourStatusType.SYNCED)
    }
    return result
  }

  private async handleGetOneResult (result: SingleApiResponse<Tour>, tourId: string | undefined): Promise<SingleApiResponse<Tour>> {
    if (isOfflineResultMessage(result.statusCode, result.statusMessage)) {
      return result
    }

    return this.handleGetTour(result, tourId)
  }

  private async handleGetTour (result: SingleApiResponse<Tour>, tourId: string| undefined): Promise<SingleApiResponse<Tour>> {
    const localTour = await this.localDatabaseService.getOne(tourId)
    if (result.statusCode === 404) {
      if (localTour && localTour.status !== TourStatusType.CREATED) {
        await this.localDatabaseService.deleteTour(tourId)
        return result
      }
    } else if (result.statusCode === 200) {
      if (!localTour) {
        await this.localDatabaseService.putTour(result.content!)
      } else if (localTour.status === TourStatusType.SYNCING) {
        return result
      } else if (localTour.status !== TourStatusType.SYNCED) {
        // serve local tour assuming these are the most recent changes
        result.content = localTour
      }
      // only update the tour in the database if it was already synced
      // otherwise we could overwrite local changes!
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private async handleTourAddResult (result: SingleApiResponse<Tour>, tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    if (isOfflineResultMessage(result.statusCode, result.statusMessage)) {
      // save the tour in the local database to not lose the changes if the user refreshes the page
      await this.localDatabaseService.create(tour)
    } else if (result.statusCode === 201) {
      await this.localDatabaseService.putTour(result.content!)
    }
    return result
  }

  private async handleTourListResult (result: ArrayApiResponse<Tour>): Promise<ArrayApiResponse<Tour>> {
    if (isOfflineResultMessage(result.statusCode, result.statusMessage)) {
      return result
    } else {
      if (!result.content) {
        result.content = []
      }
      await this.localDatabaseService.addTourList(result.content)
      result.content = await this.localDatabaseService.findAllTours()
      return result
    }
  }
}

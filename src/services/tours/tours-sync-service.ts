import LocalDatabaseService from '../local-database-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { TourStatusType } from '../../enums/tour-status-type'
import ToursService from './tours-service'
import { SingleApiResponse } from '../../types/api'

export default class ToursSyncService {
  private localDatabaseService: LocalDatabaseService
  private tourService: ToursService

  constructor (token: string | undefined) {
    this.localDatabaseService = new LocalDatabaseService(token)
    this.tourService = new ToursService(token)
  }

  public async synchronizeTourData (): Promise<SingleApiResponse<unknown>[]> {
    const toursToSync: Tour[] = await this.localDatabaseService.getToursToSynchronize()
    const resultList: SingleApiResponse<unknown>[] = []
    for (const tour of toursToSync) {
      resultList.push(await this.handleTourSync(tour))
    }
    return resultList
  }

  public async synchronizeCreatedTour (id: string | undefined, tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    const result = await this.tourService.create(tour)
    if (result.success) {
      // we can delete the local tour here as it was freshly added with the correct id
      await this.localDatabaseService.deleteTour(id)
    }
    return result
  }

  private async handleTourSync (tour: Tour): Promise<SingleApiResponse<unknown>> {
    const status = tour.status
    switch (status) {
      case TourStatusType.UPDATED:
        return this.handleUpdatedTourSync(tour)
      case TourStatusType.DELETED:
        return this.handleDeletedTourSync(tour)
      default:
        return {
          success: false,
          statusCode: 500,
          statusMessage: 'Could not find logic for syncing tour status type: ' + tour.status,
          error: undefined
        }
    }
  }

  private async handleDeletedTourSync (tour: Tour): Promise<SingleApiResponse<unknown>> {
    const result = await this.tourService.delete(tour.id)
    if (!result.success && result.error) {
      result.error.message = `Synchronization of deletion for tour "${tour.name}" was not successful. Please re-load the page. Error: ${result.error?.message}`
    }
    return result
  }

  private async handleUpdatedTourSync (tour: Tour): Promise<SingleApiResponse<unknown>> {
    await this.localDatabaseService.updateTourStatus(tour, TourStatusType.SYNCING)
    const result = await this.tourService.findOne(tour.id)
    if (!result.success && result.error) {
      result.error.message = `Synchronization of updated tour "${tour.name}" was not successful. Please re-load the page.`
      return result
    }
    const mergedTour = ToursSyncService.mergeTour(tour, result.content!)
    return this.tourService.update(tour.id, mergedTour)
  }

  private static mergeTour (tour: Tour, remoteTour: Tour): UpdateOrCreateTour {
    return {
      name: tour.name,
      description: tour.description,
      endLocation: remoteTour.endLocation,
      startLocation: remoteTour.startLocation,
      images: remoteTour.images ? remoteTour.images : []
    } as UpdateOrCreateTour
  }
}

import LocalDatabaseService from '../local-database-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { TourStatusType } from '../../enums/tour-status-type'
import ToursService from './tours-service'

export default class ToursSyncService {
  private localDatabaseService: LocalDatabaseService
  private tourService: ToursService

  constructor (token: string | undefined) {
    this.localDatabaseService = new LocalDatabaseService()
    this.tourService = new ToursService(token)
  }

  public async synchronizeTourData (): Promise<void> {
    const localDatabaseService = new LocalDatabaseService()
    const toursToSync: Tour[] = await localDatabaseService.getToursToSynchronize()
    for (const tour of toursToSync) {
      await this.handleTourSync(tour)
    }
  }

  private async handleTourSync (tour: Tour): Promise<void> {
    const status = tour.status
    switch (status) {
      case TourStatusType.UPDATED:
        console.log('updated:', tour.name)
        await this.handleUpdatedTourSync(tour)
        break
      case TourStatusType.DELETED:
        console.log('deleted', tour.name)
        await this.tourService.delete(tour.id)
        break
      default:
        console.log('could not find status type. should notify user.')
    }
  }

  private async handleUpdatedTourSync (tour: Tour): Promise<void> {
    const result = await this.tourService.findOne(tour.id)
    // todo: error handling
    const mergedTour = this.mergeTour(tour, result.content!)
    await this.tourService.update(tour.id, mergedTour)
  }

  private mergeTour (tour: Tour, remoteTour: Tour): UpdateOrCreateTour {
    return {
      name: tour.name,
      description: tour.description,
      endLocation: remoteTour.endLocation,
      startLocation: remoteTour.startLocation,
      images: remoteTour.images ? remoteTour.images : []
    } as UpdateOrCreateTour
  }
}

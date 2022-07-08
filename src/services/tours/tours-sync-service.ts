import LocalDatabaseService from '../local-database-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { TourStatusType } from '../../enums/tour-status-type'
import ToursService from './tours-service'
import { SingleApiResponse } from '../../types/api'

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

  public async synchronizeCreatedTour (id: string, tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    await this.localDatabaseService.deleteTour(id)
    return this.tourService.create(tour)
  }

  private async handleTourSync (tour: Tour): Promise<void> {
    const status = tour.status
    switch (status) {
      case TourStatusType.UPDATED:
        await this.handleUpdatedTourSync(tour)
        break
      case TourStatusType.DELETED:
        await this.tourService.delete(tour.id)
        break
      default:
        console.log('could not find status type. should notify user.') // todo: show error notification
    }
  }

  private async handleUpdatedTourSync (tour: Tour): Promise<void> {
    await this.localDatabaseService.updateTourStatus(tour, TourStatusType.SYNCING)
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

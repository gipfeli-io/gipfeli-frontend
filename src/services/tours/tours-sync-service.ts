import LocalDatabaseService from '../local-database-service'
import { Tour } from '../../types/tour'
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
        console.log('update tour: ', tour.name)
        break
      case TourStatusType.CREATED:
        console.log('create new tour', tour.name)
        break
      case TourStatusType.DELETED:
        console.log('delete tour', tour.name)
        break
      default:
        console.log('could not find status type. should notify user.')
    }
  }
}

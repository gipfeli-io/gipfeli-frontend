import { Tour, UpdateOrCreateTour } from '../types/tour'
import { localDB } from '../utils/local-database/local-db'
import dayjs from 'dayjs'
import { TourStatusType } from '../enums/tour-status-type'
import { IndexableType } from 'dexie'

export default class LocalDatabaseService {
  public async addTourList (tours: Tour[]): Promise<void> {
    for (const tour of tours) {
      const localTour = await localDB.tours.get(tour.id)
      // only update/add tour to indexed db if it is
      // not yet added or if it is marked as synced
      if (!localTour || localTour?.status === TourStatusType.SYNCED) {
        await localDB.tours.put(tour)
      }
    }
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.where('status').notEqual(TourStatusType.DELETED).toArray()
  }

  public async create (tour: UpdateOrCreateTour) : Promise<IndexableType> {
    const newTour = this.createLocalTour(tour)
    return this.putTour(newTour)
  }

  /**
   * If a tour does not exist in the table it will be created
   * If it exists it will be updated
   * @param tour
   */
  public async putTour (tour: Tour): Promise<IndexableType> {
    return localDB.tours.put(tour)
  }

  public async getOne (id: string | undefined): Promise<Tour|undefined> {
    return localDB.tours.get(id!)
  }

  public async markTourAsDeleted (tour: Tour): Promise<void> {
    const localTour = await localDB.tours.get(tour.id)
    if (localTour) {
      await this.updateTourStatus(localTour, TourStatusType.DELETED)
    }
  }

  public async deleteTour (id: string | undefined): Promise<void> {
    await localDB.tours.delete(id!)
  }

  public createLocalTour (tour: UpdateOrCreateTour): Tour {
    const id = crypto.randomUUID().toString()
    const localTour = new Tour(id, tour.name, tour.startLocation, tour.endLocation, tour.description, dayjs().toDate(), dayjs().toDate())
    localTour.status = TourStatusType.CREATED
    return localTour
  }

  public async updateLocalTour (tourId: string|undefined, updatedTour: UpdateOrCreateTour, statusType: TourStatusType): Promise<Tour|undefined> {
    if (!tourId) { return }

    const localTour = await localDB.tours.get(tourId)
    if (localTour) {
      localTour.name = updatedTour.name
      localTour.startLocation = updatedTour.startLocation
      localTour.endLocation = updatedTour.endLocation
      localTour.description = updatedTour.description
      localTour.images = updatedTour.images
      localTour.updatedAt = dayjs().toDate()
      localTour.status = statusType
    }
    return localTour
  }

  public async getToursToSynchronize (): Promise<Tour[]> {
    return localDB.tours.where('status').anyOf(TourStatusType.UPDATED, TourStatusType.DELETED).toArray()
  }

  public async updateTourStatus (tour: Tour, status: TourStatusType): Promise<void> {
    tour.status = status
    await localDB.tours.put(tour)
  }
}

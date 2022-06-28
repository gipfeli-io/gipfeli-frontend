import { Tour, UpdateOrCreateTour } from '../types/tour'
import { localDB } from '../components/shared/local-database/local-db'
import dayjs from 'dayjs'

export default class LocalDatabaseService {
  public async addTourList (tours: Tour[]): Promise<void> {
    for (const tour of tours) {
      const localTour = await localDB.tours.get(tour.id)
      // only update/add tour to indexed db if it is
      // not yet added or if it is marked as synced
      if (!localTour || localTour?.isSynced === 1) {
        await localDB.tours.put(tour)
      }
    }
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.where('isDeleted').equals(0).toArray()
  }

  /**
   * If a tour does not exist in the table it will be created
   * If it exists it will be updated
   * @param tour
   */
  public async putTour (tour: Tour): Promise<void> {
    await localDB.tours.put(tour)
  }

  public async getOne (id: string): Promise<Tour|undefined> {
    return localDB.tours.get(id)
  }

  public async markTourAsDeleted (tour: Tour): Promise<void> {
    const localTour = await localDB.tours.get(tour.id)
    if (localTour) {
      localTour.isDeleted = 1
      localTour.isSynced = 0
      await localDB.tours.put(localTour)
    }
  }

  public async deleteTour (id: string): Promise<void> {
    await localDB.tours.delete(id)
  }

  public createLocalTour (tour: UpdateOrCreateTour): Tour {
    const id = crypto.randomUUID().toString()
    const localTour = new Tour(id, tour.name, tour.startLocation, tour.endLocation, tour.description, dayjs().toDate(), dayjs().toDate())
    localTour.isSynced = 0
    return localTour
  }

  public updateLocalTour (localTour: Tour, updatedTour: UpdateOrCreateTour): Tour {
    localTour.name = updatedTour.name
    localTour.startLocation = updatedTour.startLocation
    localTour.endLocation = updatedTour.endLocation
    localTour.description = updatedTour.description
    localTour.updatedAt = dayjs().toDate()
    localTour.isSynced = 0
    return localTour
  }
}

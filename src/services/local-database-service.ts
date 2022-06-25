import { Tour } from '../types/tour'
import { localDB } from '../components/shared/local-database/local-db'

export default class LocalDatabaseService {
  public async addTourList (tours: Tour[]): Promise<void> {
    await localDB.tours.bulkPut(tours)
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.toArray()
  }

  public async addTour (tour: Tour): Promise<void> {
    await localDB.tours.add(tour)
  }
}

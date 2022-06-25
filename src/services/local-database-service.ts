import { Tour } from '../types/tour'
import { localDB } from '../components/shared/local-database/local-db'

export default class LocalDatabaseService {
  public async addTourList (tours: Tour[]): Promise<void> {
    await localDB.tours.bulkPut(tours)
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.toArray()
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
}

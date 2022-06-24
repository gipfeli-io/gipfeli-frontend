import { Tour } from '../types/tour'
import { localDB } from '../components/shared/local-database/local-db'

export default class LocalDatabaseService {
  public async addTourList (tours: Tour[]): Promise<void> {
    await localDB.tours.clear()
    await localDB.tours.bulkAdd(tours)
  }

  public async findAllTours (): Promise<Tour[]> {
    return localDB.tours.toArray()
  }
}

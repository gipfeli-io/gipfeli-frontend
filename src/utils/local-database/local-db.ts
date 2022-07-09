import Dexie, { Table } from 'dexie'
import { Tour } from '../../types/tour'

class LocalDB extends Dexie {
  tours!: Table<Tour>

  constructor () {
    super('localDB')
    this.version(1).stores({
      tours: '++id, status'
    })
    this.tours.mapToClass(Tour)
  }
}

export const localDB = new LocalDB()

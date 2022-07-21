import Dexie, { Table } from 'dexie'
import { indexedDB } from 'fake-indexeddb'
import { Tour } from '../src/types/tour'

class LocalDBMock extends Dexie {
  tours!: Table<Tour>

  constructor () {
    super('localDB', { indexedDB })
    this.version(1).stores({
      tours: '++id, status'
    })
    this.tours.mapToClass(Tour)
  }
}

export const localDB = new LocalDBMock()

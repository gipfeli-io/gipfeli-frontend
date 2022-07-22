import { Dexie, Table } from 'dexie'
import { Tour } from '../src/types/tour'
import { indexedDB, IDBKeyRange } from 'fake-indexeddb'

class LocalDBMock extends Dexie {
  tours!: Table<Tour>

  constructor () {
    super('MockedDB', { indexedDB, IDBKeyRange })
    this.version(1).stores({
      tours: '++id, status'
    })
    this.tours.mapToClass(Tour)
  }
}

export const localDBMock = new LocalDBMock()

import 'reflect-metadata'
import LocalDatabaseService from '../../../src/services/local-database-service'
import { Tour } from '../../../src/types/tour'
import { TourStatusType } from '../../../src/enums/tour-status-type'
import { Point } from 'geojson'
import { localDBMock } from '../../../__mocks__/local-db-mock'

const mockedDB = localDBMock
jest.mock('../../../src/utils/local-database/local-db', () => mockedDB)
jest.mock('uuid', () => ({ v4: () => '6a72d3cd-2d53-4e0e-8acb-0e1c98331fe1' }))

const localDatabaseService = new LocalDatabaseService()
const tourList: Tour[] = []

const getRandomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength))
  }
  return result
}

const getRandomTour = (id: string, status: TourStatusType) => {
  const point = {
    type: 'Point',
    coordinates: []
  } as Point
  const tour = new Tour(id, getRandomString(10), point, point, getRandomString(22), new Date(), new Date())
  tour.status = status
  return tour
}
const initTourData = () => {
  tourList.push(getRandomTour('34efc307-3ee9-4dc8-8b1f-7a5893348455', TourStatusType.SYNCED))
  tourList.push(getRandomTour('9865b4e5-eb64-4655-af37-30c387fb40db', TourStatusType.SYNCED))
  tourList.push(getRandomTour('b8b2c9e3-0841-485e-86ac-e62cc17f8eca', TourStatusType.UPDATED))
  tourList.push(getRandomTour('dc45d4ff-9444-482e-8a1e-f61b98ed112f', TourStatusType.CREATED))
  tourList.push(getRandomTour('801cdbf0-6a60-488a-9754-ceabf007d8d3', TourStatusType.DELETED))
}

const seedDatabase = async () => {
  for (const tour of tourList) {
    await mockedDB.tours.put(tour)
  }
}

describe('LocalDatabaseService', () => {
  beforeEach(async () => {
    jest.resetModules()
    initTourData()
    await seedDatabase()
  })
  it('finds all tours', async () => {
    const tours = localDatabaseService.findAllTours()
    expect(tours).toEqual(tourList)
  })
})

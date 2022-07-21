import 'reflect-metadata'
import LocalDatabaseService from '../../../src/services/local-database-service'
import { Tour } from '../../../src/types/tour'
import { TourStatusType } from '../../../src/enums/tour-status-type'
import { Point } from 'geojson'
import { v4 as uuidv4 } from 'uuid'
import { localDB } from '../../../__mocks__/local-db-mock'

jest.mock('../../../src/utils/local-database/local-db', () => jest.fn().mockImplementation(() => localDB))

jest.mock('uuid', () => ({ v4: () => '6a72d3cd-2d53-4e0e-8acb-0e1c98331fe1' }))

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

const getRandomTour = (status: TourStatusType) => {
  const point = {
    type: 'Point',
    coordinates: []
  } as Point
  const tour = new Tour(uuidv4(), getRandomString(10), point, point, getRandomString(22), new Date(), new Date())
  tour.status = status
  return tour
}
const initTourData = () => {
  tourList.push(getRandomTour(TourStatusType.SYNCED))
  tourList.push(getRandomTour(TourStatusType.SYNCED))
  tourList.push(getRandomTour(TourStatusType.UPDATED))
  tourList.push(getRandomTour(TourStatusType.CREATED))
  tourList.push(getRandomTour(TourStatusType.DELETED))
}

const initDatabase = async () => {
  for (const tour of tourList) {
    await localDB.tours.put(tour)
  }
}

const localDatabaseService = new LocalDatabaseService()

describe('LocalDatabaseService', () => {
  beforeEach(async () => {
    initTourData()
    await initDatabase()
  })
  it('finds all tours', async () => {
    const tours = localDatabaseService.findAllTours()
    expect(tours).toEqual(tourList)
  })
})

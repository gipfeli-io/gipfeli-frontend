import { TourCategory } from '../../../src/types/tour-category'
import { Tour, UpdateOrCreateTour } from '../../../src/types/tour'
import { Point } from 'geojson'
import { TourStatusType } from '../../../src/enums/tour-status-type'
import ToursSyncService from '../../../src/services/tours/tours-sync-service'
import fetchMock from 'jest-fetch-mock'
import LocalDatabaseService from '../../../src/services/local-database-service'
import ToursService from '../../../src/services/tours/tours-service'

const mockToken = 'mock-token'

const mockCategories: TourCategory[] = [{
  id: 'cat-1',
  name: 'cat 1',
  iconName: 'cat1.svg'
},
{
  id: 'cat-2',
  name: 'cat 2',
  iconName: 'cat2.svg'
}]

const mockTours: Tour[] = [{
  id: 'tour-1',
  name: 'tour 1',
  description: 'tour 1 description',
  userId: 'user-1',
  startLocation: {
    type: 'Point',
    coordinates: []
  } as Point,
  endLocation: {
    type: 'Point',
    coordinates: []
  } as Point,
  status: TourStatusType.DELETED,
  createdAt: new Date('2022-09-08'),
  updatedAt: new Date('2022-09-11'),
  gpxFile: undefined,
  images: [],
  categories: mockCategories
},
{
  id: 'tour-2',
  name: 'tour 2',
  description: 'tour 2 description',
  userId: 'user-1',
  startLocation: {
    type: 'Point',
    coordinates: []
  } as Point,
  endLocation: {
    type: 'Point',
    coordinates: []
  } as Point,
  status: TourStatusType.UPDATED,
  createdAt: new Date('2022-09-09'),
  updatedAt: new Date('2022-09-10'),
  gpxFile: undefined,
  images: [],
  categories: [mockCategories[1]]
}
]

const localDatabaseServiceMock = {
  deleteTour: jest.fn(),
  getToursToSynchronize: jest.fn(() => mockTours),
  updateTourStatus: jest.fn()
}

const tourServiceMock = {
  findOne: jest.fn(() => ({ success: true, content: mockTours[0] })),
  update: jest.fn(() => ({ success: true, content: undefined, error: undefined })),
  delete: jest.fn(() => ({ success: true, content: undefined, error: undefined })),
  create: jest.fn(() => ({ success: true, content: mockTours[1] }))
}

jest.mock('../../../src/services/local-database-service', () => jest.fn().mockImplementation(() => localDatabaseServiceMock))
jest.mock('../../../src/services/tours/tours-service', () => jest.fn().mockImplementation(() => tourServiceMock))

class ToursSyncServiceWrapper extends ToursSyncService {
  // eslint-disable-next-line unused-imports/no-unused-vars
  mergeTour (_tour: Tour, _remoteTour: Tour): UpdateOrCreateTour {
    return mockTours[0]
  }
}

describe('TourSyncService', () => {
  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('synchronizes all tours with status UPDATED or DELETED', async () => {
    const service = new ToursSyncServiceWrapper(mockToken)
    const localDatabaseService = new LocalDatabaseService(mockToken)
    const tourService = new ToursService(mockToken)

    const result = await service.synchronizeTourData()

    expect(localDatabaseService.getToursToSynchronize).toBeCalledTimes(1)
    expect(localDatabaseService.getToursToSynchronize).toReturnWith(mockTours)
    expect(localDatabaseService.updateTourStatus).toBeCalledTimes(1)
    expect(tourService.findOne).toBeCalledTimes(1)
    expect(tourService.update).toBeCalledTimes(1)
    expect(tourService.delete).toBeCalledTimes(1)
    expect(result.length).toBe(2)
  })

  it('synchronizes locally created tour', async () => {
    const service = new ToursSyncServiceWrapper(mockToken)
    const localDatabaseService = new LocalDatabaseService(mockToken)
    const tourService = new ToursService(mockToken)

    const result = await service.synchronizeCreatedTour(mockTours[1].id, mockTours[1])

    expect(localDatabaseService.deleteTour).toBeCalledTimes(1)
    expect(tourService.create).toBeCalledTimes(1)
    expect(result.content).toEqual(mockTours[1])
  })
})

import fetchMock from 'jest-fetch-mock'
import { Tour } from '../../../src/types/tour'
import { Point } from 'geojson'
import { TourStatusType } from '../../../src/enums/tour-status-type'
import { TourCategory } from '../../../src/types/tour-category'
import ToursService from '../../../src/services/tours/tours-service'
import restoreAllMocks = jest.restoreAllMocks

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
  status: TourStatusType.SYNCED,
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
  status: TourStatusType.SYNCED,
  createdAt: new Date('2022-09-09'),
  updatedAt: new Date('2022-09-10'),
  gpxFile: undefined,
  images: [],
  categories: mockCategories.filter((cat) => cat.id === 'cat-1')
}]

const localDatabaseServiceMock = {
  findAllTours: () => mockTours,
  addTourList: () => jest.fn(),
  create: () => mockTours[1],
  putTour: () => mockTours[1],
  getOne: () => mockTours[0],
  delete: () => jest.fn(),
  deleteTour: () => jest.fn(),
  update: () => jest.fn()
}

jest.mock('../../../src/services/local-database-service', () => jest.fn().mockImplementation(() => localDatabaseServiceMock))

describe('TourService', () => {
  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('findAll returns tour list', async () => {
    const service = new ToursService(mockToken)
    fetchMock.mockResponseOnce(JSON.stringify(mockTours))

    const result = await service.findAll()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.success).toBeTruthy()
    expect(result.content).toEqual(mockTours)
  })

  it('findAll calls api correctly', async () => {
    const service = new ToursService(mockToken)

    await service.findAll()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
  })

  it('findOne returns single tour', async () => {
    const service = new ToursService(mockToken)
    fetchMock.mockResponseOnce(JSON.stringify(mockTours[0]))

    const result = await service.findOne(mockTours[0].id)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.success).toBeTruthy()
    expect(result.content).toEqual(mockTours[0])
  })

  it('findOne calls api correctly', async () => {
    const service = new ToursService(mockToken)

    await service.findOne(mockTours[0].id)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
  })

  it('create creates a new tour and returns it', async () => {
    const service = new ToursService(mockToken)
    fetchMock.mockResponseOnce(JSON.stringify(mockTours[1]))

    const result = await service.create(mockTours[1])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.success).toBeTruthy()
    expect(result.content).toEqual(mockTours[1])
  })

  it('create calls api correctly', async () => {
    const service = new ToursService(mockToken)

    await service.create(mockTours[1])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
  })

  it('update updates existing tour', async () => {
    const service = new ToursService(mockToken)
    fetchMock.mockResponseOnce(JSON.stringify({}))

    const result = await service.update(mockTours[1].id, mockTours[1])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.success).toBeTruthy()
    expect(result.content).toBeUndefined()
  })

  it('create calls api correctly', async () => {
    const service = new ToursService(mockToken)

    await service.update(mockTours[1].id, mockTours[1])

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('PATCH')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
  })

  it('deletes a given tour', async () => {
    const service = new ToursService(mockToken)
    fetchMock.mockResponseOnce(JSON.stringify({}))

    const result = await service.delete(mockTours[1].id)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.success).toBeTruthy()
    expect(result.content).toBeUndefined()
  })

  it('delete calls api correctly', async () => {
    const service = new ToursService(mockToken)

    await service.delete(mockTours[1].id)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('DELETE')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
  })

  afterEach(() => {
    restoreAllMocks()
  })
})

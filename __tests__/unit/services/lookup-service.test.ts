import fetchMock from 'jest-fetch-mock'
import LookupService from '../../../src/services/lookup/lookup-service'
import { TourCategory } from '../../../src/types/tour-category'

describe('LookupService', () => {
  const mockedToken: string = 'mockedAccessToken'
  const tourListMock: TourCategory[] = [
    { id: '1234', name: 'cat-1', iconName: 'cat1.svg' },
    { id: '4567', name: 'cat-2', iconName: 'cat2.svg' }
  ]

  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('call api correctly', async () => {
    const service = new LookupService(mockedToken)
    fetchMock.mockResponseOnce(JSON.stringify({}))

    await service.findAllTourCategories()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockedToken}`)
  })

  it('returns a list of tours correctly', async () => {
    const service = new LookupService(mockedToken)
    fetchMock.mockResponseOnce(JSON.stringify(tourListMock))

    const response = await service.findAllTourCategories()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(response.success).toBe(true)
    expect(response.content).toEqual(tourListMock)
  })
})

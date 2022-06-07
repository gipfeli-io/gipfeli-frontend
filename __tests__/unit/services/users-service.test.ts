import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import UsersService from '../../../src/services/users/users-service'

describe('UsersService', () => {
  const mockedToken: string = 'mockedAccessToken'

  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('calls API with correct request', async () => {
    const service = new UsersService(mockedToken)
    fetchMock.mockResponseOnce(JSON.stringify({}))

    await service.profile()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockedToken}`)
  })

  it('calls API and returns the response as JSON', async () => {
    const service = new UsersService(mockedToken)
    const mockResponse = { data: 'thisIsTheMock' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const login = await service.profile()
    const result = await login.json()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResponse)
  })
})

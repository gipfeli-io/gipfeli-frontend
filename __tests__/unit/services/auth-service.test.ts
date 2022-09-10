import '@testing-library/jest-dom'
import AuthService from '../../../src/services/auth/auth-service'
import fetchMock from 'jest-fetch-mock'

describe('AuthService', () => {
  const mockUser = 'test'
  const mockPassword = 'password'
  const mockedToken: string = 'mockedAccessToken'

  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('has correct prefix set', () => {
    const service = new AuthService()
    expect(service).toHaveProperty('prefix', 'auth')
  })

  it('calls API with correct login params', async () => {
    const service = new AuthService()
    fetchMock.mockResponseOnce(JSON.stringify({}))

    await service.login(mockUser, mockPassword)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toContain(mockUser)
    expect(fetchMock.mock.calls[0][1]?.body).toContain(mockPassword)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls API and returns the response as JSON', async () => {
    const service = new AuthService()
    const mockResponse = { accessToken: mockedToken }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const result = await service.login(mockUser, mockPassword)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.content).toEqual(mockResponse)
  })
})

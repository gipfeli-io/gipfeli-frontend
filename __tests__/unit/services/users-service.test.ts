import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import UsersService from '../../../src/services/users/users-service'
import { UserRole } from '../../../src/enums/user-role'

describe('UsersService', () => {
  const mockedToken: string = 'mockedAccessToken'

  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('calls profile with correct request', async () => {
    const service = new UsersService(mockedToken)

    await service.profile()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockedToken}`)
  })

  it('gets profile and return the response as JSON', async () => {
    const service = new UsersService(mockedToken)
    const mockResponse = { data: 'thisIsTheMock' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const login = await service.profile()
    const result = await login.json()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResponse)
  })

  it('calls findAll with correct request', async () => {
    const service = new UsersService(mockedToken)

    await service.findAll()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('GET')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockedToken}`)
  })

  it('calls findAll and returns user list', async () => {
    const service = new UsersService(mockedToken)
    const mockResponse = [
      {
        id: '1234',
        email: 'user@gipfeli.io',
        firstName: 'Peter',
        lastName: 'Meier',
        role: UserRole.USER
      }
    ]

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const response = await service.findAll()

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(response.content).toEqual(mockResponse)
  })

  it('calls delete with correct request', async () => {
    const service = new UsersService(mockedToken)

    await service.delete('1234')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('DELETE')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockedToken}`)
  })

  it('calls delete', async () => {
    const service = new UsersService(mockedToken)
    fetchMock.mockResponseOnce(JSON.stringify({}))

    const response = await service.delete('1234')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(response.content).toBeUndefined()
  })
})

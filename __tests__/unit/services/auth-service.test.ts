import '@testing-library/jest-dom'
import AuthService from '../../../src/services/auth/auth-service'
import fetchMock from 'jest-fetch-mock'

describe('AuthService', () => {
  const mockUser = 'test'
  const mockPassword = 'password'
  const mockToken: string = 'mockedAccessToken'
  const mockSessionId: string = 'mockedSessionId'
  const mockRefreshToken: string = 'mockedRefreshToken'

  const signupMock = {
    email: 'test@gipfeli.io',
    firstName: 'Test',
    lastName: 'User',
    password: mockPassword,
    passwordConfirmation: mockPassword
  }

  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('has correct prefix set', () => {
    const service = new AuthService()
    expect(service).toHaveProperty('prefix', 'auth')
  })

  it('calls login endpoint with correct params', async () => {
    const service = new AuthService()

    await service.login(mockUser, mockPassword)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toContain(mockUser)
    expect(fetchMock.mock.calls[0][1]?.body).toContain(mockPassword)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls login endpoint and returns the response as JSON', async () => {
    const service = new AuthService()
    const mockResponse = { accessToken: mockToken }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const result = await service.login(mockUser, mockPassword)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.content).toEqual(mockResponse)
  })

  it('calls logout endpoint with correct params', async () => {
    const service = new AuthService()
    fetchMock.mockResponseOnce(JSON.stringify({}))

    await service.logout(mockSessionId)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toContain(mockSessionId)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls refresh tokens endpoint with correct params', async () => {
    const service = new AuthService()

    await service.refreshTokens(mockRefreshToken)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.headers).toEqual({
      Authorization: `Bearer ${mockRefreshToken}`,
      'Content-Type': 'application/json'
    })
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls refresh tokens endpoint and returns the response as JSON', async () => {
    const service = new AuthService()
    const mockResponse = { accessToken: mockToken, refreshToken: mockRefreshToken }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    const result = await service.refreshTokens(mockRefreshToken)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.content).toEqual(mockResponse)
  })

  it('calls activate user endpoint with correct params', async () => {
    const service = new AuthService()

    await service.activateUser(mockUser, mockToken)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({ userId: mockUser, token: mockToken }))
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls signup endpoint with correct params', async () => {
    const service = new AuthService()

    await service.signUp(signupMock.email, signupMock.firstName, signupMock.lastName, signupMock.password, signupMock.passwordConfirmation)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify(signupMock))
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls request password reset endpoint with correct params', async () => {
    const service = new AuthService()

    await service.requestPasswordReset(signupMock.email)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({ email: signupMock.email }))
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })

  it('calls perform password reset endpoint with correct params', async () => {
    const service = new AuthService()

    await service.performPasswordReset(mockUser, mockToken, signupMock.password, signupMock.passwordConfirmation)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({
      userId: mockUser,
      token: mockToken,
      password: mockPassword,
      passwordConfirmation: mockPassword
    }))
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
  })
})

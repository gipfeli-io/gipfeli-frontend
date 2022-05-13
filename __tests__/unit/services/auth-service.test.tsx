import '@testing-library/jest-dom'
import AuthService from '../../../src/services/auth/auth-service'

const mockUser = 'test'
const mockPassword = 'password'

describe('AuthService', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('has correct prefix set', () => {
        expect(AuthService).toHaveProperty('prefix', 'auth')
    })

    it('calls API with correct login params', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}))

        const login = await AuthService.login(mockUser, mockPassword)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetchMock.mock.calls[0][1]?.body).toContain(mockUser)
        expect(fetchMock.mock.calls[0][1]?.body).toContain(mockPassword)
    })

    it('calls API and returns the response as JSON', async () => {
        const mockResponse = {data: 'thisIsTheMock'}
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

        const login = await AuthService.login(mockUser, mockPassword)
        const result = await login.json()

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResponse)
        expect(result).toEqual('x')
    })
})
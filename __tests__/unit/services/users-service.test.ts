import '@testing-library/jest-dom'
import AuthService from '../../../src/services/auth/auth-service'
import UsersService from '../../../src/services/users/users-service'
import {Session} from 'next-auth'


describe('AuthService', () => {
    const sessionMock: Session = {
        accessToken: 'mockedAccessToken',
        expires: Date.now().toString(),
        user: {}
    }

    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('calls API with correct request', async () => {
        const service = new UsersService(sessionMock)
        fetchMock.mockResponseOnce(JSON.stringify({}))

        await service.profile()

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetchMock.mock.calls[0][1]?.method).toEqual('get')
        // @ts-ignore
        expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(sessionMock.accessToken)
    })

    it('calls API and returns the response as JSON', async () => {
        const service = new UsersService(sessionMock)
        const mockResponse = {data: 'thisIsTheMock'}
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

        const login = await service.profile()
        const result = await login.json()

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResponse)
    })
})
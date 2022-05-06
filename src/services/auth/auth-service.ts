import APIService from '../api-service'

export default class AuthService extends APIService {
    public static async login(username: string, password: string): Promise<Response> {
        return await fetch(
            this.getRequestUrl('auth/login'),
            this.getRequestBody('get', {username, password})
        )
    }
}
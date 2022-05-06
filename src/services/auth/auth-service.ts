import APIService from '../api-service'

export default class AuthService extends APIService {
    private static prefix: string = 'auth'

    public static async login(username: string, password: string): Promise<Response> {
        return await fetch(
            this.getRequestUrl(this.prefix, 'login'),
            this.getRequestBody('post', {username, password})
        )
    }
}
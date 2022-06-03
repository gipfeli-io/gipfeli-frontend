import APIService from '../api-service'

export default class AuthService extends APIService {
  private prefix: string = 'auth'

  public async login (username: string, password: string): Promise<Response> {
    return await fetch(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { username, password })
    )
  }
}

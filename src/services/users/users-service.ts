import APIService from '../api-service'

export default class UsersService extends APIService {
  private prefix: string = 'users'

  constructor (token: string | any) {
    super()
    this.accessToken = token
  }

  public async profile (): Promise<Response> {
    return await fetch(
      this.getRequestUrl(this.prefix, 'profile'),
      this.getRequestBody('GET', {})
    )
  }
}

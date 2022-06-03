import APIService from '../api-service'

export default class UsersService extends APIService {
  private prefix: string = 'users'

  constructor (session: any) {
    super()
    this.session = session
  }

  public async profile (): Promise<Response> {
    return await fetch(
      this.getRequestUrl(this.prefix, 'profile'),
      this.getRequestBody('GET', {})
    )
  }
}

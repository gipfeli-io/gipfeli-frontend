import APIService from '../api-service'
import { ArrayApiResponse, SingleApiResponse } from '../../types/api'
import { User } from '../../types/user'

export default class UsersService extends APIService {
  private prefix: string = 'users'

  constructor (token: string | any) {
    super()
    this.accessToken = token
  }

  public async findAll (): Promise<ArrayApiResponse<User>> {
    return this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      User
    )
  }

  public async delete (id: string): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
  }

  public async profile (): Promise<Response> {
    return fetch(
      this.getRequestUrl(this.prefix, 'profile'),
      this.getRequestBody('GET', {})
    )
  }
}

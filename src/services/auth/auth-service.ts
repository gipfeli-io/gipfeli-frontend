import APIService from '../api-service'
import LocalStorageService from '../local-storage-service'
import { LocalStorageKey } from '../../enums/LocalStorageKey'
import { AuthObject } from '../../types/auth'
import { SingleApiResponse } from '../../types/api'

interface LoginResponse {
  token: string;
}

export default class AuthService extends APIService {
  private prefix: string = 'auth'
  private localStorageService: LocalStorageService = new LocalStorageService()

  public async login (username: string, password: string): Promise<LoginResponse> {
    const response = await this.sendLoginRequest(username, password)

    if (response.success && response.content) {
      // eslint-disable-next-line camelcase
      const { access_token } = response.content
      this.localStorageService.addItem(LocalStorageKey.UserSession, access_token)

      // eslint-disable-next-line camelcase
      return { token: access_token }
    } else {
      return { token: 'xx' } // handle error
    }
  }

  public async logout (): Promise<void> {
    // todo: call api endpoint
    this.localStorageService.removeItem(LocalStorageKey.UserSession)
  }

  private async sendLoginRequest (username: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { username, password }),
      AuthObject
    )
  }
}

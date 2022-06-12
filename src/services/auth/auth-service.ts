import APIService from '../api-service'
import LocalStorageService from '../local-storage-service'
import { LocalStorageKey } from '../../enums/local-storage-key'
import { AuthObject } from '../../types/auth'
import { SingleApiResponse } from '../../types/api'

export default class AuthService extends APIService {
  private prefix: string = 'auth'
  private localStorageService: LocalStorageService = new LocalStorageService()

  public async login (email: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return await this.sendLoginRequest(email, password)
  }

  public async logout (): Promise<void> {
    // todo: call api endpoint
    this.localStorageService.removeItem(LocalStorageKey.UserSession)
  }

  public async activateUser (userId: string, token: string): Promise<SingleApiResponse<void>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'activate'),
      this.getRequestBody('POST', { userId, token }),
      undefined
    )
  }

  public async signUp (email: string, firstName: string, lastName: string, password: string): Promise<SingleApiResponse<void>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'signup'),
      this.getRequestBody('POST', { email, firstName, lastName, password }),
      undefined
    )
  }

  private async sendLoginRequest (email: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { email, password }),
      AuthObject
    )
  }
}

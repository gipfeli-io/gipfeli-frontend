import APIService from '../api-service'
import LocalStorageService from '../local-storage-service'
import { LocalStorageKey } from '../../enums/local-storage-key'
import { AuthObject } from '../../types/auth'
import { SingleApiResponse } from '../../types/api'

export default class AuthService extends APIService {
  private prefix: string = 'auth'
  private localStorageService: LocalStorageService = new LocalStorageService()

  public async login (username: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return await this.sendLoginRequest(username, password)
  }

  public async logout (): Promise<void> {
    // todo: call api endpoint
    this.localStorageService.removeItem(LocalStorageKey.UserSession)
  }

  public async signUp (email: string, firstName: string, lastName: string, password: string): Promise<SingleApiResponse<void>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'signup'),
      this.getRequestBody('POST', { email, firstName, lastName, password }),
      undefined
    )
  }

  private async sendLoginRequest (username: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { username, password }),
      AuthObject
    )
  }
}

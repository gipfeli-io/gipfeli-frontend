import APIService from '../api-service'
import LocalStorageService from '../local-storage-service'
import { LocalStorageKey } from '../../enums/LocalStorageKey'

export default class AuthService extends APIService {
  private prefix: string = 'auth'
  private localStorageService: LocalStorageService = new LocalStorageService()

  public async login (username: string, password: string): Promise<void> {
    const response = await this.sendLoginRequest(username, password)
    this.localStorageService.addItem(LocalStorageKey.UserSession, response.access_token)
  }

  public async logout (): Promise<void> {
    // todo: call api endpoint
    this.localStorageService.removeItem(LocalStorageKey.UserSession)
  }

  private async sendLoginRequest (username: string, password: string): Promise<any> {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { username, password })
    )
  }
}

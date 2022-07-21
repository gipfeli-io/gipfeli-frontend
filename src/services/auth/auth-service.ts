import APIService from '../api-service'
import { AuthObject } from '../../types/auth'
import { SingleApiResponse } from '../../types/api'

export default class AuthService extends APIService {
  private prefix: string = 'auth'

  public async login (email: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return this.sendLoginRequest(email, password)
  }

  public async refreshTokens (refreshToken: string): Promise<SingleApiResponse<AuthObject>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'refresh'),
      this.getRequestBody('POST', null, refreshToken),
      AuthObject
    )
  }

  public async activateUser (userId: string, token: string): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'activate'),
      this.getRequestBody('POST', { userId, token })
    )
  }

  public async signUp (email: string, firstName: string, lastName: string, password: string): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'signup'),
      this.getRequestBody('POST', { email, firstName, lastName, password })
    )
  }

  public async requestPasswordReset (email: string): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'password-reset-request'),
      this.getRequestBody('POST', { email })
    )
  }

  private async sendLoginRequest (email: string, password: string): Promise<SingleApiResponse<AuthObject>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'login'),
      this.getRequestBody('POST', { email, password }),
      AuthObject
    )
  }

  async performPasswordReset (userId: string, token: string, password: string) {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'password-reset-set'),
      this.getRequestBody('POST', { userId, token, password })
    )
  }
}

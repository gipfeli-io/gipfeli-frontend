import { ApiResponseWrapper, ArrayApiResponse, SingleApiResponse } from '../types/api'
import { plainToInstance } from 'class-transformer'

export interface RequestBody {
  headers: {
    'Content-Type': string
    'Authorization'?: string
  };
  method: string;
  body?: string;
}

export default abstract class APIService {
  protected token?: string = undefined
  private baseUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'

  protected getRequestUrl (prefix: string, endpoint?: string): string {
    const baseUrl = `${this.baseUrl}/${prefix}`
    return endpoint ? `${baseUrl}/${endpoint}` : baseUrl
  }

  protected getRequestBody (method: 'GET' | 'POST' | 'PATCH' | 'DELETE', body?: any): RequestBody {
    const requestBody: RequestBody = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (method !== 'GET') {
      requestBody.body = body ? JSON.stringify(body) : ''
    }

    if (this.token) {
      requestBody.headers = { ...requestBody.headers, Authorization: this.extractBearerTokenFromSession() }
    }

    return requestBody
  }

  protected async fetchArrayDataFromApi<T> (url: string, body: RequestBody, responseClass: new (...args: any[]) => T): Promise<ArrayApiResponse<T>> {
    const response = await this.fetchDataFromApi(url, body)
    const wrapper = this.createResponseWrapper(response)

    if (wrapper.success) {
      const body = await response.json()
      const content = plainToInstance<T, T>(responseClass, body)

      return { content, ...wrapper }
    }

    return wrapper
  }

  protected async fetchSingleDataFromApi<T> (url: string, body: RequestBody, responseClass: new (...args: any[]) => T): Promise<SingleApiResponse<T>> {
    const response = await this.fetchDataFromApi(url, body)
    const wrapper = this.createResponseWrapper(response)

    if (wrapper.success) {
      const body = await response.json()
      const content = plainToInstance(responseClass, body)

      return { content, ...wrapper }
    }

    return wrapper
  }

  private createResponseWrapper (response: Response): ApiResponseWrapper {
    return { success: true, statusCode: response.status, statusMessage: response.statusText }
  }

  private async fetchDataFromApi (url: string, body: RequestBody): Promise<any> {
    return await fetch(url, body)
  }

  private extractBearerTokenFromSession (): string {
    return `Bearer ${this.token}`
  }
}

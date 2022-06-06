import { ApiResponseWrapper, ArrayApiResponse, ClassCastHint, SingleApiResponse } from '../types/api'
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

  /**
   * Returns data from an endpoint that contains arrays of data. The generic parameter is used to cast the response
   * content to its object.
   * @param url Exact URL for the endpoint
   * @param body The request payload
   * @param responseClass Defines the object the response should be cast into. If undefined, no content is returned.
   * @protected
   */
  protected async fetchArrayDataFromApi<T> (url: string, body: RequestBody, responseClass: ClassCastHint<T> = undefined): Promise<ArrayApiResponse<T>> {
    const response = await this.fetchDataFromApi(url, body)
    const wrapper = this.createResponseWrapper(response)

    if (wrapper.success) {
      const body = await this.extractJsonResponse(response)

      let content
      if (responseClass !== undefined) {
        content = plainToInstance<T, T>(responseClass, body)
      }

      return { content, ...wrapper }
    }

    return wrapper
  }

  /**
   * Returns data from an endpoint that contains single data objects. The generic parameter is used to cast the response
   * content to its object.
   * @param url Exact URL for the endpoint
   * @param body The request payload
   * @param responseClass Defines the object the response should be cast into. If undefined, no content is returned.
   * @protected
   */
  protected async fetchSingleDataFromApi<T> (url: string, body: RequestBody, responseClass: ClassCastHint<T> = undefined): Promise<SingleApiResponse<T>> {
    const response = await this.fetchDataFromApi(url, body)
    const wrapper = this.createResponseWrapper(response)

    if (wrapper.success) {
      const body = await this.extractJsonResponse(response)

      let content
      if (responseClass !== undefined) {
        content = plainToInstance(responseClass, body)
      }

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

  /**
   * Extracts the body from an API Response. Since some endpoints might not have a body (e.g. DELETE endpoints), an
   * empty object is returned.
   * @param response
   * @private
   */
  private async extractJsonResponse (response: Response): Promise<any> {
    try {
      return await response.json()
    } catch (e) {
      return {}
    }
  }

  private extractBearerTokenFromSession (): string {
    return `Bearer ${this.token}`
  }
}

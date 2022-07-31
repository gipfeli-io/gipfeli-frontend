import {
  ApiResponseWrapper,
  ArrayApiResponse,
  ClassCastHint,
  ErrorContent,
  RequestBody,
  SingleApiResponse
} from '../types/api'
import { plainToInstance } from 'class-transformer'

export default abstract class APIService {
  protected accessToken?: string = undefined
  private baseUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'

  protected getRequestUrl (prefix: string, endpoint?: string): string {
    const baseUrl = `${this.baseUrl}/${prefix}`
    return endpoint ? `${baseUrl}/${endpoint}` : baseUrl
  }

  protected getRequestBody (method: 'GET' | 'POST' | 'PATCH' | 'DELETE', body?: any, overrideTokenHeader?: string): RequestBody {
    const requestBody: RequestBody = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (method !== 'GET') {
      requestBody.body = body ? JSON.stringify(body) : ''
    }

    const useAuthHeader = overrideTokenHeader || this.accessToken
    if (useAuthHeader) {
      requestBody.headers = { ...requestBody.headers, Authorization: this.extractBearerTokenFromSession(useAuthHeader) }
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
    const [wrapper, responseBody] = await this.fetchDataFromApi(url, body)

    if (wrapper.success) {
      let content
      if (responseClass !== undefined) {
        content = plainToInstance<T, T>(responseClass, responseBody)
      }

      return { content, ...wrapper }
    }

    return this.getErrorResponse(wrapper, responseBody)
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
    const [wrapper, responseBody] = await this.fetchDataFromApi(url, body)
    if (wrapper.success) {
      let content
      if (responseClass !== undefined) {
        content = plainToInstance(responseClass, responseBody)
      }

      return { content, ...wrapper }
    }

    return this.getErrorResponse(wrapper, responseBody)
  }

  private getErrorResponse (wrapper: ApiResponseWrapper, { error, message }: ErrorContent): ApiResponseWrapper {
    wrapper.error = { error, message }
    return wrapper
  }

  private createResponseWrapper (success: boolean, statusCode: number, statusMessage: string): ApiResponseWrapper {
    return { success, statusCode, statusMessage }
  }

  /**
   * Wraps the fetch call and handles cases where fetch succeeds or fails if e.g. the API is down.
   * Returns an array where the first element is the wrapper object and the second is the parsed response body.
   * @param url
   * @param body
   * @private
   */
  private async fetchDataFromApi (url: string, body: RequestBody): Promise<[ApiResponseWrapper, any]> {
    try {
      const response = await fetch(url, body)
      const jsonBody = await this.extractJsonResponse(response)
      return [this.createResponseWrapper(response.ok, response.status, response.statusText), jsonBody]
    } catch (error) {
      return [this.createResponseWrapper(false, 500, (error as Error).message), {}]
    }
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

  private extractBearerTokenFromSession (token: string): string {
    return `Bearer ${token}`
  }
}

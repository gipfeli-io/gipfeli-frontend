import '@testing-library/jest-dom'
import APIService, { RequestBody } from '../../../src/services/api-service'

/**
 * Wrapper class to test protected methods from APIService. These protected methods are not part of the public interface
 * but only used by extending classes. However, since they are heavily used, they should be unit-tested nonetheless.
 */
class ApiServiceWrapper extends APIService {
  constructor (session?: any) {
    super()
    this.session = {
      accessToken: 'mockedAccessToken',
      expires: Date.now().toString(),
      user: {}
    }
  }

  getRequestUrl (prefix: string, endpoint: string): string {
    return super.getRequestUrl(prefix, endpoint)
  }

  getRequestBody (method: 'GET' | 'POST' | 'PATCH' | 'DELETE', body?: any): RequestBody {
    return super.getRequestBody(method, body)
  }
}

describe('APIService', () => {
  const env = process.env
  const prefix = 'test-prefix'
  const endpoint = 'test-endpoint'
  const body = { data: 'testBody' }
  const sessionMock: any = {
    accessToken: 'mockedAccessToken',
    expires: Date.now().toString(),
    user: {}
  }

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  it('generates correct request URL', () => {
    const wrapper = new ApiServiceWrapper()

    const result = wrapper.getRequestUrl(prefix, endpoint)

    const expected = `http://localhost:3000/${prefix}/${endpoint}`
    expect(result).toEqual(expected)
  })

  it('overrides default base URL if environment variable is set', () => {
    const overrideBaseUrl = 'http://www.this-is-overridden.com'
    process.env.NEXT_PUBLIC_BACKEND_API = overrideBaseUrl
    const wrapper = new ApiServiceWrapper()

    const result = wrapper.getRequestUrl(prefix, endpoint)

    const expected = `${overrideBaseUrl}/${prefix}/${endpoint}`
    expect(result).toEqual(expected)
  })

  it('generates correct request body for GET request', () => {
    const wrapper = new ApiServiceWrapper()

    const result = wrapper.getRequestBody('GET')

    const expected: RequestBody = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
    expect(result).toEqual(expected)
  })

  it('ignores body parameter for GET requests', () => {
    const wrapper = new ApiServiceWrapper()

    const result = wrapper.getRequestBody('GET', body)

    expect(result).not.toHaveProperty('body')
  })

  it('generates correct request body for POST request', () => {
    const wrapper = new ApiServiceWrapper()

    const result = wrapper.getRequestBody('POST', body)

    const expected: RequestBody = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
    expect(result).toEqual(expected)
  })

  it('correctly injects the authorization token from the session', () => {
    const wrapper = new ApiServiceWrapper(sessionMock)

    const result = wrapper.getRequestBody('GET')

    const expected = `Bearer ${sessionMock.accessToken}`
    expect(result.headers.Authorization).toEqual(expected)
  })

  afterEach(() => {
    process.env = env
  })
})

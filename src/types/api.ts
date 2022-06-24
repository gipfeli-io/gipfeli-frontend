/**
 * Main API Response that contains success state, statuscode and message, and if an error happened, the corresponding
 * error.
 */
export interface ApiResponseWrapper {
  success: boolean
  statusCode: number
  statusMessage: string
  error?: ErrorContent
}

/**
 * Contains an error object that always has an error (e.g. BadRequest) as well as an optional message.
 */
export interface ErrorContent {
  error: string
  message?: string
}

/**
 * Generic API response that returns a single entity (or undefined).
 */
export interface SingleApiResponse<T> extends ApiResponseWrapper {
  content?: T
}

/**
 * Generic API response that returns an array of entities (or undefined).
 */
export interface ArrayApiResponse<T> extends ApiResponseWrapper {
  content?: T[]
}

/**
 * Helper type that can be used to typehint a class object.
 */
export type ClassCastHint<T> = (new (...args: any[]) => T) | void

/**
 * Basic request body that is sent to the backend.
 */
export interface RequestBody {
  headers: {
    'Content-Type'?: string
    'Authorization'?: string
  };
  method: string
  body?: string | FormData
}

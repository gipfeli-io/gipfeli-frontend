export interface ApiResponseWrapper {
  success: boolean
  statusCode: number
  statusMessage: string
}

export interface SingleApiResponse<T> extends ApiResponseWrapper {
  content?: T
}

export interface ArrayApiResponse<T> extends ApiResponseWrapper {
  content?: T[]
}

export type ClassCastHint<T> = (new (...args: any[]) => T) | void

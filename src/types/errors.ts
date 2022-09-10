import { ErrorType } from '../enums/error-type'

/**
 * Generic error class that is thrown when authenticated users try to access the admin page without being an admin. This
 * is never thrown inside API requests, so it does not extend from GenericApiError.
 */
export class UnauthorizedAdminAccess extends Error {
  message = 'Unauthorized admin access.'
}

/**
 * This base error class is used to throw any non-specific errors that happen during any API calls. If not extending
 * NonCriticalApiError, these are handled by displaying a 500 error page.
 */
export class GenericApiError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.GENERIC
  }
}

/**
 * Statuscode: 500
 */
export class ServerError extends GenericApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.SERVER_ERROR
  }
}

/**
 * NonCriticalApiError are handled by triggering an error notification, but not interrupting the normal render flow.
 */
export abstract class NonCriticalApiError extends GenericApiError {
}

/**
 * Statuscode: 413
 */
export class PayLoadTooLarge extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.PAYLOAD_TOO_LARGE
  }
}

/**
 * Statuscode: 404
 */
export class NotFoundError extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.NOT_FOUND
  }
}

/**
 * Statuscode: 403
 */
export class ForbiddenError extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.FORBIDDEN
  }
}

/**
 * Statuscode: 401
 */
export class UnauthorizedError extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.UNAUTHORIZED
  }
}

/**
 * Statuscode: 400
 */
export class BadRequestError extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.BAD_REQUEST
  }
}

/**
 * Statuscode: 500 due to being offline
 */
export class OfflineError extends NonCriticalApiError {
  constructor (message: string) {
    super(message)
    this.name = ErrorType.OFFLINE
  }
}

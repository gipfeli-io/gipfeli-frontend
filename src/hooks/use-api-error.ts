import { useCallback, useState } from 'react'
import { ApiResponseWrapper, ErrorContent } from '../types/api'
import {
  BadRequestError,
  ForbiddenError,
  GenericApiError,
  NonCriticalApiError,
  NotFoundError,
  PayLoadTooLarge,
  ServerError,
  UnauthorizedError
} from '../types/errors'
import useNotifications from './use-notifications'
import { useNavigate } from 'react-router'

/**
 * This hook allows us to handle errors from within async code and, if they are thrown, still have them caught by an
 * ErrorBoundary. This workaround is needed since React ErrorBoundaries do not catch errors in async hooks.
 *
 * If the error is NonCritical, we just trigger a notification and redirect to the tours index.
 *
 * See https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
 */
const useApiError = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setError] = useState<Error>()
  const { triggerErrorNotification } = useNotifications()
  const navigate = useNavigate()

  /**
   * We extract the error type and generate the corresponding object. If we have more details, the message parameter on
   * the ErrorContent object is set and we show this - otherwise, we just show the generic error type.
   * @param statusCode
   * @param error
   * @param message
   */
  const getApiError: (statusCode: number, error: ErrorContent) => (GenericApiError) = (statusCode: number, {
    error,
    message
  }: ErrorContent) => {
    const displayMessage = message ?? error

    switch (statusCode) {
      case 400:
        return new BadRequestError(displayMessage)
      case 401:
        return new UnauthorizedError(displayMessage)
      case 403:
        return new ForbiddenError(displayMessage)
      case 404:
        return new NotFoundError(displayMessage)
      case 413:
        return new PayLoadTooLarge(displayMessage)
      case 500:
        return new ServerError(displayMessage)
      default:
        return new GenericApiError(displayMessage)
    }
  }

  return useCallback((apiResponse: ApiResponseWrapper, redirect: boolean = true) => {
    // At this point, we know that we have an error, because we would not get here without it.
    const error = getApiError(apiResponse.statusCode, apiResponse.error!)
    console.log(apiResponse)
    if (error instanceof NonCriticalApiError) {
      triggerErrorNotification(error.message)

      if (redirect) {
        navigate('/tours', { replace: true })
      }
    } else {
      setError(() => {
        throw error
      })
    }
  },
  [setError]
  )
}

export default useApiError

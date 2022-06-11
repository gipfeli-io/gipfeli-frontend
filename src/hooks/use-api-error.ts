import { useCallback, useState } from 'react'
import { ApiResponseWrapper } from '../types/api'
import {
  BadRequestError,
  ForbiddenError,
  GenericApiError,
  NonCriticalApiError,
  NotFoundError,
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

  const getApiError: (statusCode: number, message: string) => (GenericApiError) = (statusCode: number, message: string) => {
    switch (statusCode) {
      case 400:
        return new BadRequestError(message)
      case 401:
        return new UnauthorizedError(message)
      case 403:
        return new ForbiddenError(message)
      case 404:
        return new NotFoundError(message)
      case 500:
        return new ServerError(message)
      default:
        return new GenericApiError(message)
    }
  }

  return useCallback((apiResponse: ApiResponseWrapper, redirect: boolean = true) => {
    const error = getApiError(apiResponse.statusCode, apiResponse.statusMessage)

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

import { useCallback, useState } from 'react'
import { ApiResponseWrapper } from '../types/api'
import { ForbiddenError, GenericApiError, NotFoundError, ServerError, UnauthorizedError } from '../types/errors'

/**
 * This hook allows us to throw errors from within async code and still have them caught by an ErrorBoundary. This
 * workaround is needed since React ErrorBoundaries do not catch errors in async hooks.
 *
 * See https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
 */
const useApiError = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setError] = useState<Error>()

  const getApiError: (statusCode: number, message: string) => (GenericApiError) = (statusCode: number, message: string) => {
    switch (statusCode) {
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

  return useCallback((apiResponse: ApiResponseWrapper) => {
    const error = getApiError(apiResponse.statusCode, apiResponse.statusMessage)

    setError(() => {
      throw error
    })
  },
  [setError]
  )
}

export default useApiError

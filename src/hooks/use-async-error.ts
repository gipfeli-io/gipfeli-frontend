import { useCallback, useState } from 'react'

/**
 * This hook allows us to throw errors from within async code and still have them caught by an ErrorBoundary. This
 * workaround is needed since React ErrorBoundaries do not catch errors in async hooks.
 *
 * See https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
 */
const useAsyncError = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setError] = useState()
  return useCallback((e: any) => {
    setError(() => {
      throw e
    })
  },
  [setError]
  )
}

export default useAsyncError

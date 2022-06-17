import { useEffect, useRef } from 'react'

/**
 * Creates a reusable interval timer as a hook. Does so by assigning the callback to a mutable Ref and handling the
 * clearing of setInterval()
 * @param callback
 * @param delay
 */
const useInterval = (callback: CallableFunction, delay: number) => {
  const savedCallback = useRef<CallableFunction>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick () {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval

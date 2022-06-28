import React, { PropsWithChildren, useEffect, useState } from 'react'
import OnlineStatusContext from '../../contexts/online-status-context'

export const OnlineStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true)

  useEffect(() => {
    window.addEventListener('offline', () => setOnlineStatus(false))
    window.addEventListener('online', () => setOnlineStatus(true))

    return () => {
      window.removeEventListener('offline', () => setOnlineStatus(false))
      window.removeEventListener('online', () => setOnlineStatus(true))
    }
  }, [])

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  )
}

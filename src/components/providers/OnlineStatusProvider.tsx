import React, { PropsWithChildren, useState } from 'react'
import OnlineStatusContext from '../../contexts/online-status-context'
import useInterval from '../../hooks/use-interval'
import ToursSyncService from '../../services/tours/tours-sync-service'
import useAuth from '../../hooks/use-auth'

export const OnlineStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true)
  const auth = useAuth()
  const requestUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'
  const pollingDelay: string | number = process.env.ONLINE_POLLING_DELAY || 20000
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)

  const checkOnlineStatus = async (): Promise<void> => {
    try {
      const request = await fetch(requestUrl + '/robots.txt')
      if (request.status < 500) {
        setOnlineStatus(true)
        if (auth.token) {
          // todo: show notification banner showing synchronization
          await tourSyncService.synchronizeTourData()
        }
      } else {
        setOnlineStatus(false)
      }
    } catch (error) {
      setOnlineStatus(false)
    }
  }

  useInterval(checkOnlineStatus, +pollingDelay)

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  )
}

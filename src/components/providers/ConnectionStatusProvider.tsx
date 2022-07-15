import React, { PropsWithChildren, useState } from 'react'
import ConnectionStatusContext from '../../contexts/connection-status-context'
import { ConnectionStatus } from '../../enums/connection-status'
import { ConnectionStatusContextType } from '../../types/contexts'
import { LocalStorageKey } from '../../enums/local-storage-key'
import LocalStorageService from '../../services/local-storage-service'
import { useNavigate } from 'react-router'
import { OnlineBannerStatus } from '../../enums/OnlineBannerStatus'

export const ConnectionStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const localStorageService = new LocalStorageService()
  const navigate = useNavigate()
  const requestUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'
  const pollingDelay: string | number = process.env.ONLINE_POLLING_DELAY || 20000
  // eslint-disable-next-line no-undef
  let intervalId: NodeJS.Timer
  const [onlineBannerStatus, setOnlineBannerStatus] = useState<OnlineBannerStatus>(OnlineBannerStatus.HIDE)

  const checkIfApplicationIsOnline = async () : Promise<void> => {
    const request = await fetch(requestUrl + '/heartbeat')
    if (request.status === 200) {
      clearInterval(intervalId)
      setOnlineBannerStatus(OnlineBannerStatus.SHOW)
    }
  }

  const initPolling = () => {
    intervalId = setInterval(checkIfApplicationIsOnline, +pollingDelay)
  }

  const getInitialConnectionStatus = () => {
    const savedConnectionStatusChoice = localStorageService.getItem(LocalStorageKey.ConnectionStatus)
    if (savedConnectionStatusChoice) {
      const status = savedConnectionStatusChoice === ConnectionStatus.ONLINE ? ConnectionStatus.ONLINE : ConnectionStatus.OFFLINE
      if (status === ConnectionStatus.OFFLINE) {
        initPolling()
      }
      return status
    }

    return ConnectionStatus.ONLINE
  }
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(getInitialConnectionStatus)

  const isOffline = () => connectionStatus === ConnectionStatus.OFFLINE

  const showOnlineBanner = () => onlineBannerStatus === OnlineBannerStatus.SHOW

  const updateOnlineBannerStatus = (bannerStatus: OnlineBannerStatus) => {
    setOnlineBannerStatus(bannerStatus)
  }

  const updateConnectionStatus = (status: ConnectionStatus) => {
    localStorageService.addItem(LocalStorageKey.ConnectionStatus, status)
    setConnectionStatus(status)
    if (status === ConnectionStatus.OFFLINE) {
      initPolling()
    }
    navigate('/tours', { replace: true })
  }

  const value: ConnectionStatusContextType = {
    isOffline,
    showOnlineBanner,
    updateOnlineBannerStatus,
    updateConnectionStatus
  }

  return (
    <ConnectionStatusContext.Provider value={value}>
      {children}
    </ConnectionStatusContext.Provider>
  )
}

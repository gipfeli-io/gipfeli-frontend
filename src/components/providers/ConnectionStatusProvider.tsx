import React, { PropsWithChildren, useState } from 'react'
import ConnectionStatusContext from '../../contexts/connection-status-context'
import { ConnectionStatus } from '../../enums/connection-status'
import { ConnectionStatusContextType } from '../../types/contexts'
import { LocalStorageKey } from '../../enums/local-storage-key'
import LocalStorageService from '../../services/local-storage-service'
import { useNavigate } from 'react-router'

export const ConnectionStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const localStorageService = new LocalStorageService()
  const navigate = useNavigate()
  const requestUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'
  const pollingDelay: string | number = process.env.ONLINE_POLLING_DELAY || 20000
  // eslint-disable-next-line no-undef
  let intervalId: NodeJS.Timer

  const getInitialOnlineInfoBannerVisibility = () => {
    const savedOnlineInfoBannerVisibility = localStorageService.getItem(LocalStorageKey.IsOnlineBannerSeen)
    if (!savedOnlineInfoBannerVisibility) {
      return false
    }
    return JSON.parse(savedOnlineInfoBannerVisibility) === true
  }

  const [isOnlineInfoBannerVisible, setIsOnlineInfoBannerVisible] = useState<boolean>(getInitialOnlineInfoBannerVisibility)

  const updateOnlineInfoBannerVisibility = (isVisible: boolean) => {
    localStorageService.addItem(LocalStorageKey.IsOnlineBannerSeen, String(!isVisible))
    setIsOnlineInfoBannerVisible(isVisible)
  }

  const resetOnlineInfoBanner = () => {
    localStorageService.removeItem(LocalStorageKey.IsOnlineBannerSeen)
    setIsOnlineInfoBannerVisible(false)
  }

  const getInitialGoOnlineButtonState = () => {
    const savedGoOnlineButtonState = localStorageService.getItem(LocalStorageKey.IsGoOnlineButtonVisible)
    if (!savedGoOnlineButtonState) {
      return false
    }

    return JSON.parse(savedGoOnlineButtonState) === true
  }

  const [showGoOnlineButton, setShowGoOnlineButton] = useState<boolean>(getInitialGoOnlineButtonState)

  const updateGoOnlineButtonVisibility = (isVisible: boolean) => {
    localStorageService.addItem(LocalStorageKey.IsGoOnlineButtonVisible, String(isVisible))
    setShowGoOnlineButton(isVisible)
  }

  const checkIfApplicationIsOnline = async () : Promise<void> => {
    const request = await fetch(requestUrl + '/heartbeat')
    if (request.status === 200) {
      clearInterval(intervalId)
      updateGoOnlineButtonVisibility(true)
      updateOnlineInfoBannerVisibility(true)
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

  const updateConnectionStatus = (status: ConnectionStatus) => {
    localStorageService.addItem(LocalStorageKey.ConnectionStatus, status)
    setConnectionStatus(status)
    if (status === ConnectionStatus.OFFLINE) {
      initPolling()
    } else {
      updateGoOnlineButtonVisibility(false)
    }
    navigate('/tours', { replace: true })
  }

  const isOffline = () => connectionStatus === ConnectionStatus.OFFLINE

  const value: ConnectionStatusContextType = {
    isOffline,
    updateConnectionStatus,
    updateGoOnlineButtonVisibility,
    showGoOnlineButton,
    isOnlineInfoBannerVisible,
    updateOnlineInfoBannerVisibility,
    resetOnlineInfoBanner
  }

  return (
    <ConnectionStatusContext.Provider value={value}>
      {children}
    </ConnectionStatusContext.Provider>
  )
}

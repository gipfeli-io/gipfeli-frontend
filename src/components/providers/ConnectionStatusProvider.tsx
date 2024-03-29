import React, { PropsWithChildren, useState } from 'react'
import ConnectionStatusContext from '../../contexts/connection-status-context'
import { ConnectionStatus } from '../../enums/connection-status'
import { ConnectionStatusContextType } from '../../types/contexts'
import { LocalStorageKey } from '../../enums/local-storage-key'
import LocalStorageService from '../../services/local-storage-service'
import HeartbeatService from '../../services/heartbeat-service'

export const ConnectionStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const localStorageService = new LocalStorageService()
  const heartBeatService = new HeartbeatService()
  const pollingDelay: string = process.env.REACT_APP_ONLINE_POLLING_DELAY || '20000'
  // eslint-disable-next-line no-undef
  let intervalId: NodeJS.Timer

  const getInitialOnlineInfoBannerVisibility = () => {
    const savedOnlineInfoBannerVisibility = localStorageService.getItem(LocalStorageKey.IsOnlineBannerVisible)
    if (!savedOnlineInfoBannerVisibility) {
      return false
    }
    return JSON.parse(savedOnlineInfoBannerVisibility) === true
  }

  const [isOnlineInfoBannerVisible, setIsOnlineInfoBannerVisible] = useState<boolean>(getInitialOnlineInfoBannerVisibility)

  const updateOnlineInfoBannerVisibility = (isVisible: boolean) => {
    localStorageService.addItem(LocalStorageKey.IsOnlineBannerVisible, String(isVisible))
    setIsOnlineInfoBannerVisible(isVisible)
  }

  const resetOnlineInfoBanner = () => {
    localStorageService.removeItem(LocalStorageKey.IsOnlineBannerVisible)
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

  const checkIfApplicationIsOnline = async (): Promise<void> => {
    const result = await heartBeatService.checkHeartbeat()
    if (result.statusCode === 200) {
      clearInterval(intervalId)
      updateGoOnlineButtonVisibility(true)
      updateOnlineInfoBannerVisibility(true)
    }
  }

  const initPolling = () => {
    intervalId = setInterval(checkIfApplicationIsOnline, parseInt(pollingDelay))
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

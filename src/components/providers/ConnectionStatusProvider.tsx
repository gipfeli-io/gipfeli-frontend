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

  const getInitialConnectionStatus = () => {
    const savedConnectionStatusChoice = localStorageService.getItem(LocalStorageKey.ConnectionStatus)
    if (savedConnectionStatusChoice) {
      return savedConnectionStatusChoice === ConnectionStatus.ONLINE ? ConnectionStatus.ONLINE : ConnectionStatus.OFFLINE
    }

    return ConnectionStatus.ONLINE
  }

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(getInitialConnectionStatus)

  const updateConnectionStatus = (status: ConnectionStatus) => {
    localStorageService.addItem(LocalStorageKey.ConnectionStatus, status)
    setConnectionStatus(status)
    navigate('/tours', { replace: true })
  }

  const value: ConnectionStatusContextType = {
    connectionStatus,
    updateConnectionStatus
  }

  return (
    <ConnectionStatusContext.Provider value={value}>
      {children}
    </ConnectionStatusContext.Provider>
  )
}

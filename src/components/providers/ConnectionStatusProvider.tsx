import React, { PropsWithChildren, useState } from 'react'
import ConnectionStatusContext from '../../contexts/connection-status-context'
import { ConnectionStatus } from '../../enums/connection-status'
import { ConnectionStatusContextType } from '../../types/contexts'

export const ConnectionStatusProvider = ({ children }: PropsWithChildren<any>) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.ONLINE)

  const updateConnectionStatus = (status: ConnectionStatus) => {
    setConnectionStatus(status)
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

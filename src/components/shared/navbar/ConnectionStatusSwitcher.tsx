import { Button } from '@mui/material'
import React from 'react'
import useConnectionStatus from '../../../hooks/use-connection-status'
import WifiIcon from '@mui/icons-material/Wifi'
import { ConnectionStatus } from '../../../enums/connection-status'

const ConnectionStatusSwitcher = () => {
  const { showConnectionStatusSwitcher, updateConnectionStatus } = useConnectionStatus()
  const goOnline = () => {
    updateConnectionStatus(ConnectionStatus.ONLINE)
  }
  return (
    showConnectionStatusSwitcher
      ? <Button sx={{ mr: 3 }} onClick={goOnline} variant="outlined" color="inherit" startIcon={<WifiIcon/>}>Go online</Button>
      : null
  )
}

export default ConnectionStatusSwitcher

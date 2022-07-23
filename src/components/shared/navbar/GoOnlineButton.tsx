import { Button } from '@mui/material'
import React from 'react'
import useConnectionStatus from '../../../hooks/use-connection-status'
import WifiIcon from '@mui/icons-material/Wifi'
import useGoOnline from '../../../hooks/use-go-online'

const GoOnlineButton = () => {
  const { showGoOnlineButton } = useConnectionStatus()
  const activateOnlineMode = useGoOnline()
  const goOnline = async (): Promise<void> => {
    (await activateOnlineMode)()
  }
  return (
    showGoOnlineButton
      ? <Button sx={{ mr: 3 }} onClick={goOnline} variant="outlined" color="inherit" startIcon={<WifiIcon/>}>Go online</Button>
      : null
  )
}

export default GoOnlineButton

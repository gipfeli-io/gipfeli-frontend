import { Fab } from '@mui/material'
import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi'
import useConnectionStatus from '../../hooks/use-connection-status'
import useTheme from '../../hooks/use-theme'
import useGoOnline from '../../hooks/use-go-online'

const GoOnlineButton = () => {
  const { showGoOnlineButton } = useConnectionStatus()
  const activateOnlineMode = useGoOnline()
  const { activeTheme: { theme } } = useTheme()

  const goOnline = async (): Promise<void> => {
    activateOnlineMode()
  }

  return (
    showGoOnlineButton
      ? (
        <Fab
          variant="extended"
          color="primary"
          onClick={goOnline}
          sx={{ position: 'fixed', bottom: theme.spacing(3), right: theme.spacing(3) }}
        >
          <WifiIcon sx={{ mr: 1 }}/>
          Go online
        </Fab>)

      : null
  )
}

export default GoOnlineButton

import { Button, Snackbar, SnackbarContent } from '@mui/material'
import React from 'react'
import useConnectionStatus from '../../hooks/use-connection-status'
import { ConnectionStatus } from '../../enums/connection-status'
import { OnlineBannerStatus } from '../../enums/OnlineBannerStatus'

const OnlineNotificationSnackbar = () => {
  const { showOnlineBanner, updateOnlineBannerStatus, updateConnectionStatus } = useConnectionStatus()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    updateOnlineBannerStatus(OnlineBannerStatus.HIDE)
  }

  const goOnline = (event: React.SyntheticEvent | Event, reason?:string): void => {
    if (reason === 'clickaway') { return }
    updateConnectionStatus(ConnectionStatus.ONLINE)
    updateOnlineBannerStatus(OnlineBannerStatus.HIDE)
    handleClose(event)
  }

  const onlineBannerAction = (<Button color="secondary" size="small" onClick={goOnline}>Go online</Button>)

  const getOnlineBannerContent = (
    <SnackbarContent
      message='Yeah you got connection! You can now deactivate the offline mode if you want. This will automatically sync all your offline data to the server. :)'
      action={onlineBannerAction}
    />
  )

  const snackbarContent = showOnlineBanner() ? getOnlineBannerContent : <></>

  return (
    showOnlineBanner()
      ? <Snackbar
      open={showOnlineBanner()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      {snackbarContent}
    </Snackbar>
      : null
  )
}

export default OnlineNotificationSnackbar

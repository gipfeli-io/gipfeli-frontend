import { Alert, Button, Snackbar, SnackbarContent } from '@mui/material'
import React from 'react'
import useNotifications from '../../hooks/use-notifications'
import { NotificationType } from '../../enums/notification-type'
import useConnectionStatus from '../../hooks/use-connection-status'
import { ConnectionStatus } from '../../enums/connection-status'

const NotificationSnackbar = () => {
  const { notification, resetNotification } = useNotifications()
  const { updateConnectionStatus } = useConnectionStatus()
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    resetNotification()
  }

  const goOffline = (event: React.SyntheticEvent | Event, reason?:string): void => {
    if (reason === 'clickaway') { return }
    updateConnectionStatus(ConnectionStatus.OFFLINE)
    handleClose(event)
  }

  const offlineAction = (
      <Button color="secondary" size="small" onClick={goOffline}>Go offline</Button>
  )

  const snackbarContent = (
    notification?.type === NotificationType.OFFLINE
      ? <SnackbarContent
        message={notification?.message}
        action={offlineAction}
      />
      : <Alert onClose={handleClose} severity={notification?.type === NotificationType.SUCCESS ? 'success' : 'error'}>
        {notification?.message}
      </Alert>
  )

  return (
    <Snackbar
      open={notification?.visible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      {snackbarContent}
    </Snackbar>
  )
}

export default NotificationSnackbar

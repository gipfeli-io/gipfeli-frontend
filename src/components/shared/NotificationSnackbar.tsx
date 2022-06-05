import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import useNotifications from '../../hooks/use-notifications'
import { NotificationType } from '../../enums/NotificationType'

const NotificationSnackbar = () => {
  const { notification, resetNotification } = useNotifications()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    resetNotification()
  }

  return (
    <Snackbar
      open={notification?.visible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type === NotificationType.SUCCESS ? 'success' : 'error'}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationSnackbar

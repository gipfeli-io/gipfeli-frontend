import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import useNotifications from '../../hooks/use-notifications'

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
      autoHideDuration={notification?.autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationSnackbar

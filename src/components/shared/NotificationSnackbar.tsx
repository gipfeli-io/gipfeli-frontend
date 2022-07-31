import { Alert, Button, Snackbar, SnackbarContent } from '@mui/material'
import React from 'react'
import useNotifications from '../../hooks/use-notifications'
import { NotificationType } from '../../enums/notification-type'
import useConnectionStatus from '../../hooks/use-connection-status'
import { ConnectionStatus } from '../../enums/connection-status'
import { useLocation, useNavigate } from 'react-router'

const NotificationSnackbar = () => {
  const { notification, resetNotification } = useNotifications()
  const { updateConnectionStatus, resetOnlineInfoBanner } = useConnectionStatus()
  const navigate = useNavigate()
  const location = useLocation()
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    resetNotification()
  }

  const goOffline = (_event: React.SyntheticEvent | Event, reason?:string): void => {
    if (reason === 'clickaway') { return }
    updateConnectionStatus(ConnectionStatus.OFFLINE)
    resetOnlineInfoBanner()
    handleClose(_event)

    // refresh page to get application working offline
    if (location.pathname !== '/tours/create') {
      navigate(0)
    } else {
      navigate('/tours', { replace: true })
    }
  }

  const offlineAction = (
      <Button color="secondary" size="small" onClick={goOffline}>Go offline</Button>
  )

  const getSeverity = () => notification?.type === NotificationType.SUCCESS ? 'success' : 'error'

  const snackbarContent = (
    notification?.type === NotificationType.OFFLINE
      ? <SnackbarContent
        message={notification?.message}
        action={offlineAction}
      />
      : <Alert onClose={handleClose} severity={getSeverity()}>
        {notification?.message}
      </Alert>
  )

  const getAutoHideDuration = () => notification?.autoHide ? 3000 : null

  return (
    <Snackbar
      open={notification?.visible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
      autoHideDuration={getAutoHideDuration()}
    >
      {snackbarContent}
    </Snackbar>
  )
}

export default NotificationSnackbar

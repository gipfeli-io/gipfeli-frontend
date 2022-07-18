import { Button, Snackbar, SnackbarContent } from '@mui/material'
import React from 'react'
import useConnectionStatus from '../../hooks/use-connection-status'
import { ConnectionStatus } from '../../enums/connection-status'
import ToursSyncService from '../../services/tours/tours-sync-service'
import useAuth from '../../hooks/use-auth'
import useNotifications from '../../hooks/use-notifications'
import { SingleApiResponse } from '../../types/api'

const OnlineNotificationSnackbar = () => {
  const auth = useAuth()
  const { triggerSyncFailedNotification } = useNotifications()
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)
  const { isOnlineInfoBannerVisible, updateOnlineInfoBannerVisibility, updateConnectionStatus } = useConnectionStatus()

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    updateOnlineInfoBannerVisibility(false)
  }

  const goOnline = async (_event: React.SyntheticEvent | Event, reason?:string): Promise<void> => {
    if (reason === 'clickaway') { return }
    updateConnectionStatus(ConnectionStatus.ONLINE)
    const results = await tourSyncService.synchronizeTourData()
    results.forEach((result: SingleApiResponse<unknown>) => {
      if (result.error) {
        triggerSyncFailedNotification(result.error.message!)
      }
    })
    handleClose(_event)
  }

  const onlineBannerAction = (<Button color="secondary" size="small" onClick={goOnline}>Go online</Button>)

  const getOnlineBannerContent = (
    <SnackbarContent
      message='Yeah you got connection! You can now deactivate the offline mode if you want. This will automatically sync all your offline data to the server. :)'
      action={onlineBannerAction}
    />
  )

  const snackbarContent = isOnlineInfoBannerVisible ? getOnlineBannerContent : <></>

  return (
    isOnlineInfoBannerVisible
      ? <Snackbar
      open={isOnlineInfoBannerVisible}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      {snackbarContent}
    </Snackbar>
      : null
  )
}

export default OnlineNotificationSnackbar

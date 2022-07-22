import { Button } from '@mui/material'
import React from 'react'
import useConnectionStatus from '../../../hooks/use-connection-status'
import WifiIcon from '@mui/icons-material/Wifi'
import { ConnectionStatus } from '../../../enums/connection-status'
import { SingleApiResponse } from '../../../types/api'
import useAuth from '../../../hooks/use-auth'
import useNotifications from '../../../hooks/use-notifications'
import ToursSyncService from '../../../services/tours/tours-sync-service'

const GoOnlineButton = () => {
  const { showGoOnlineButton, updateConnectionStatus } = useConnectionStatus()
  const auth = useAuth()
  const { triggerSyncFailedNotification } = useNotifications()
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)

  const goOnline = async (): Promise<void> => {
    updateConnectionStatus(ConnectionStatus.ONLINE)
    const results = await tourSyncService.synchronizeTourData()
    results.forEach((result: SingleApiResponse<unknown>) => {
      if (result.error) {
        triggerSyncFailedNotification(result.error.message!)
      }
    })
  }
  return (
    showGoOnlineButton
      ? <Button sx={{ mr: 3 }} onClick={goOnline} variant="outlined" color="inherit" startIcon={<WifiIcon/>}>Go online</Button>
      : null
  )
}

export default GoOnlineButton

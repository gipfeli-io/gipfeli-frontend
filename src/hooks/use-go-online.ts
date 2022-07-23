import { ConnectionStatus } from '../enums/connection-status'
import { SingleApiResponse } from '../types/api'
import useAuth from './use-auth'
import useNotifications from './use-notifications'
import ToursSyncService from '../services/tours/tours-sync-service'
import useConnectionStatus from './use-connection-status'
import { useCallback } from 'react'

const useGoOnline = async () => {
  const auth = useAuth()
  const { triggerSyncFailedNotification } = useNotifications()
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)
  const { updateConnectionStatus } = useConnectionStatus()

  return useCallback(() => {
    async function syncData () {
      const results = await tourSyncService.synchronizeTourData()
      results.forEach((result: SingleApiResponse<unknown>) => {
        if (result.error) {
          triggerSyncFailedNotification(result.error.message!)
        }
      })
    }
    updateConnectionStatus(ConnectionStatus.ONLINE)
    syncData()
  }, [])
}

export default useGoOnline

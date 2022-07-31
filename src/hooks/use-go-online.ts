import { ConnectionStatus } from '../enums/connection-status'
import { SingleApiResponse } from '../types/api'
import useAuth from './use-auth'
import useNotifications from './use-notifications'
import ToursSyncService from '../services/tours/tours-sync-service'
import useConnectionStatus from './use-connection-status'
import { useCallback } from 'react'
import useErrorHandling from './use-error-handling'

const useGoOnline = () => {
  const auth = useAuth()
  const { triggerSyncFailedNotification } = useNotifications()
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)
  const { updateConnectionStatus, updateOnlineInfoBannerVisibility } = useConnectionStatus()
  const { triggerError } = useErrorHandling()

  return useCallback(() => {
    async function syncData () {
      try {
        const results = await tourSyncService.synchronizeTourData()
        results.forEach((result: SingleApiResponse<unknown>) => {
          if (result.error) {
            const { message } = result.error

            if (message !== undefined) {
              Array.isArray(message) ? triggerSyncFailedNotification('An error occurred') : triggerSyncFailedNotification(message)
            }
          }
        })
        updateOnlineInfoBannerVisibility(false)
        updateConnectionStatus(ConnectionStatus.ONLINE)
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }

    syncData()
  }, [])
}

export default useGoOnline

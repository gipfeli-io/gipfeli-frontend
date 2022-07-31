import { ConnectionStatus } from '../enums/connection-status'
import { SingleApiResponse, ValidationError } from '../types/api'
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
    function getMessageString (validationErrors: string | ValidationError[]): string {
      let message: string = 'An error occurred while synchronizing data.\n'
      if (Array.isArray(validationErrors)) {
        validationErrors.forEach((validationError: ValidationError) => { message = `${message}"${validationError.errors.join('\n')}"` })
      } else {
        message = `${message}${validationErrors}`
      }
      return message
    }

    async function syncData () {
      try {
        const results = await tourSyncService.synchronizeTourData()
        results.forEach((result: SingleApiResponse<unknown>) => {
          if (result.error) {
            const { message } = result.error
            if (message !== undefined) {
              triggerSyncFailedNotification(getMessageString(message))
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

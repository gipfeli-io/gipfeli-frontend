import { ConnectionStatus } from '../enums/connection-status'
import { SingleApiResponse, ValidationError } from '../types/api'
import useAuth from './use-auth'
import useNotifications from './use-notifications'
import ToursSyncService from '../services/tours/tours-sync-service'
import useConnectionStatus from './use-connection-status'
import { useCallback } from 'react'
import useErrorHandling from './use-error-handling'
import { redirectAfterConnectionStatusChange } from '../utils/offline-helper'
import { useLocation, useNavigate } from 'react-router'

const useGoOnline = () => {
  const auth = useAuth()
  const { triggerSyncFailedNotification } = useNotifications()
  const tourSyncService: ToursSyncService = new ToursSyncService(auth.token)
  const { updateConnectionStatus, updateOnlineInfoBannerVisibility } = useConnectionStatus()
  const { triggerError } = useErrorHandling()
  const location = useLocation()
  const navigate = useNavigate()

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
        let hasErrors = false
        const results = await tourSyncService.synchronizeTourData()
        results.forEach((result: SingleApiResponse<unknown>) => {
          if (result.error) {
            hasErrors = true
            const { message } = result.error
            if (message !== undefined) {
              triggerSyncFailedNotification(getMessageString(message))
            }
          }
        })
        updateOnlineInfoBannerVisibility(false)
        updateConnectionStatus(ConnectionStatus.ONLINE)

        if (!hasErrors) {
          redirectAfterConnectionStatusChange(location.pathname, navigate)
        }
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }

    syncData()
  }, [])
}

export default useGoOnline

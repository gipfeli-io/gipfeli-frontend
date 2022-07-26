import useNotifications from './use-notifications'
import { useCallback } from 'react'
import HeartbeatService from '../services/heartbeat-service'
import { isOfflineResultMessage } from '../utils/offline-helper'

const useCheckConnection = () => {
  const heartBeatService = new HeartbeatService()
  const { triggerOfflineNotification } = useNotifications()

  return useCallback(() => {
    async function checkConnection () {
      const result = await heartBeatService.checkHeartbeat()
      if (isOfflineResultMessage(result.statusCode, result.statusMessage)) {
        triggerOfflineNotification()
      }
    }
    checkConnection()
  }, [])
}

export default useCheckConnection

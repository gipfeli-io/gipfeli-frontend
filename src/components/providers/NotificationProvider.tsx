import React, { PropsWithChildren, useState } from 'react'
import NotificationContext from '../../contexts/notification-context'
import { Notification } from '../../types/notifications'
import { NotificationType } from '../../enums/notification-type'
import NotificationSnackbar from '../shared/NotificationSnackbar'
import { NotificationContextType } from '../../types/contexts'

const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined)

  const triggerNotification = (message: string, type: NotificationType, autoHideDuration?: number | null) => {
    autoHideDuration = autoHideDuration === undefined ? 3000 : autoHideDuration
    setNotification({ message, type, visible: true, autoHideDuration })
  }

  const triggerSuccessNotification = (message: string) => {
    triggerNotification(message, NotificationType.SUCCESS)
  }

  const triggerErrorNotification = (message: string) => {
    triggerNotification(message, NotificationType.ERROR)
  }

  const triggerOfflineNotification = () => {
    const message = 'Oh no, your internet connection is gone! But good news, you can switch to the offline mode to keep using the app.'
    triggerNotification(message, NotificationType.OFFLINE, null)
  }

  const triggerSyncFailedNotification = (message: string) => {
    triggerNotification(message, NotificationType.ERROR, null)
  }

  const resetNotification = () => {
    setNotification(undefined)
  }

  const value: NotificationContextType = {
    notification,
    triggerErrorNotification,
    triggerSuccessNotification,
    triggerOfflineNotification,
    triggerSyncFailedNotification,
    resetNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      <NotificationSnackbar/>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

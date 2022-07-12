import React, { PropsWithChildren, useState } from 'react'
import NotificationContext from '../../contexts/notification-context'
import { Notification } from '../../types/notifications'
import { NotificationType } from '../../enums/notification-type'
import NotificationSnackbar from '../shared/NotificationSnackbar'
import { NotificationContextType } from '../../types/contexts'

const NotificationProvider = ({ children }: PropsWithChildren<any>) => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined)

  const triggerNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type, visible: true })
  }

  const triggerSuccessNotification = (message: string) => {
    triggerNotification(message, NotificationType.SUCCESS)
  }

  const triggerErrorNotification = (message: string) => {
    triggerNotification(message, NotificationType.ERROR)
  }

  const triggerOfflineNotification = () => {
    triggerNotification('You are offline. Please activate offline mode to keep using the app.', NotificationType.OFFLINE)
  }

  const resetNotification = () => {
    setNotification(undefined)
  }

  const value: NotificationContextType = {
    notification,
    triggerErrorNotification,
    triggerSuccessNotification,
    triggerOfflineNotification,
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

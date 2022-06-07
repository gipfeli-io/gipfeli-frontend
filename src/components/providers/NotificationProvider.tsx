import React, { useState } from 'react'
import NotificationContext, { NotificationContextType } from '../../contexts/notification-context'
import { Notification } from '../../types/notifications'
import { NotificationType } from '../../enums/notification-type'
import NotificationSnackbar from '../shared/NotificationSnackbar'

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
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

  const resetNotification = () => {
    setNotification(undefined)
  }

  const value: NotificationContextType = {
    notification,
    triggerErrorNotification,
    triggerSuccessNotification,
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

import React from 'react'
import { Notification } from '../types/notifications'

export interface NotificationContextType {
  notification: Notification | undefined;
  triggerErrorNotification: (message: string) => void;
  triggerSuccessNotification: (message: string) => void;
  resetNotification: () => void;
}

const NotificationContext = React.createContext<NotificationContextType>(null!)

export default NotificationContext

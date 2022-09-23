import React from 'react'
import { NotificationContextType } from '../types/contexts'

/**
 * The context interface (NotificationContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/NotificationProvider.tsx, which provides functionality to
 * display notifications for various scenarios.
 *
 * We provide the hook src/hooks/use-notifications, so you can easily re-use all the functionality in your components and services.
 */
const NotificationContext = React.createContext<NotificationContextType>(null!)

export default NotificationContext

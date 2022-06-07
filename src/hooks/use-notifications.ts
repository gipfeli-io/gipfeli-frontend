import { useContext } from 'react'
import NotificationContext from '../contexts/notification-context'

const useNotifications = () => useContext(NotificationContext)

export default useNotifications

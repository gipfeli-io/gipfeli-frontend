import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const useNotifications = () => useContext(NotificationContext)

export default useNotifications

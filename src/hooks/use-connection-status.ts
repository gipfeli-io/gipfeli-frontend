import { useContext } from 'react'
import ConnectionStatusContext from '../contexts/connection-status-context'

const useConnectionStatus = () => useContext(ConnectionStatusContext)

export default useConnectionStatus

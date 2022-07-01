import { useContext } from 'react'
import OnlineStatusContext from '../contexts/online-status-context'

const useOnlineStatus = () => useContext(OnlineStatusContext)

export default useOnlineStatus

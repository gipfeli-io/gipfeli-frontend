import AuthenticationContext from '../contexts/AuthenticationContext'
import { useContext } from 'react'

const useAuth = () => useContext(AuthenticationContext)

export default useAuth

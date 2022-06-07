import AuthenticationContext from '../contexts/authentication-context'
import { useContext } from 'react'

const useAuth = () => useContext(AuthenticationContext)

export default useAuth

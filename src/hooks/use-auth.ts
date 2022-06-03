import AuthenticationContext from '../context/AuthenticationContext'
import { useContext } from 'react'

const useAuth = () => useContext(AuthenticationContext)

export default useAuth

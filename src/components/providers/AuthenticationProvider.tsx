import React, { useEffect, useState } from 'react'
import AuthenticationContext, { AuthenticationContextType } from '../../contexts/authentication-context'
import AuthService from '../../services/auth/auth-service'
import LocalStorageService from '../../services/local-storage-service'
import { LocalStorageKey } from '../../enums/local-storage-key'
import jwtDecode from 'jwt-decode'
import Loader from '../shared/Loader'
import { JwtToken } from '../../types/jwt-token'
import useApiError from '../../hooks/use-api-error'
import useNotifications from '../../hooks/use-notifications'

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const authService: AuthService = new AuthService()
  const localStorageService: LocalStorageService = new LocalStorageService()
  const throwError = useApiError()
  const { triggerErrorNotification } = useNotifications()

  // Check on page reload if we have a stored token and set it accordingly
  useEffect(() => {
    const storedToken = localStorageService.getItem(LocalStorageKey.UserSession)
    if (storedToken && !token) {
      // todo: check with API if token is still valid
      const decoded: JwtToken = jwtDecode(storedToken)
      setToken(storedToken)
      setUsername(decoded.username)
    }

    setLoading(false)
  }, [])

  // Todo: periodically check for token validity?

  const signIn = async (username: string, password: string, callback: () => void) => {
    // todo: handle error
    const data = await authService.login(
      username,
      password
    )

    if (data.success) {
      const token = data.content!.access_token
      localStorageService.addItem(LocalStorageKey.UserSession, token)
      setUsername(username)
      setToken(token)
      callback()
    } else if (data.statusCode === 404) {
      triggerErrorNotification('Combination of password and user does not exist.')
    } else {
      throwError(data)
      callback()
    }
  }

  const signOut = async (callback: () => void) => {
    // todo: handle error
    await authService.logout()
    setUsername(undefined)
    setToken(undefined)

    callback()
  }

  const value: AuthenticationContextType = { username, token, signIn, signOut }

  if (loading) {
    return <Loader />
  }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationProvider

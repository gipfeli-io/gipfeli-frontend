import React, { PropsWithChildren, useEffect, useState } from 'react'
import AuthenticationContext from '../../contexts/authentication-context'
import AuthService from '../../services/auth/auth-service'
import LocalStorageService from '../../services/local-storage-service'
import { LocalStorageKey } from '../../enums/local-storage-key'
import jwtDecode from 'jwt-decode'
import Loader from '../shared/Loader'
import { JwtToken } from '../../types/jwt-token'
import useApiError from '../../hooks/use-api-error'
import useNotifications from '../../hooks/use-notifications'
import { AuthenticationContextType } from '../../types/contexts'
import useInterval from '../../hooks/use-interval'
import tokenNeedsRefresh from '../../utils/token-needs-refresh'

const AuthenticationProvider = ({ children }: PropsWithChildren<any>) => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const authService: AuthService = new AuthService()
  const localStorageService: LocalStorageService = new LocalStorageService()
  const throwError = useApiError()
  const { triggerErrorNotification } = useNotifications()

  const signIn = async (email: string, password: string, callback: () => void) => {
    // todo: handle error
    const data = await authService.login(
      email,
      password
    )

    if (data.success) {
      const token = data.content!.access_token
      localStorageService.addItem(LocalStorageKey.UserSession, token)
      setEmail(email)
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
    setEmail(undefined)
    setToken(undefined)

    callback()
  }

  const checkAndRefreshToken = () => {
    console.log('check')
    // We only check for the token if we actually have a token
    if (!token) {
      return
    }
    const decodedToken: JwtToken = jwtDecode(token)

    if (tokenNeedsRefresh(decodedToken)) {
      // todo: handle tokenrefresh
      signOut(() => triggerErrorNotification('You have been signed out due to inactivity.'))
    }
  }
  // Check on page reload if we have a stored token and set it accordingly
  useEffect(() => {
    const storedToken = localStorageService.getItem(LocalStorageKey.UserSession)
    if (storedToken && !token) {
      const decoded: JwtToken = jwtDecode(storedToken)
      if (tokenNeedsRefresh(decoded)) {
        // todo: handle tokenrefresh
        signOut(() => triggerErrorNotification('You have been signed out due to inactivity.'))
      } else {
        setToken(storedToken)
        setEmail(decoded.email)
      }
    }

    setLoading(false)
  }, [])

  useInterval(checkAndRefreshToken, 2000)

  const value: AuthenticationContextType = { email, token, signIn, signOut }

  if (loading) {
    return <Loader/>
  }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationProvider

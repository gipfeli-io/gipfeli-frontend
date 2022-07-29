import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
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
import { AccessToken, AuthObject } from '../../types/auth'
import { useNavigate } from 'react-router'
import { UserRole } from '../../enums/user-role'

const AuthenticationProvider = ({ children }: PropsWithChildren<any>) => {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined)
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const authService: AuthService = new AuthService()
  const localStorageService: LocalStorageService = new LocalStorageService()
  const throwError = useApiError()
  const { triggerErrorNotification } = useNotifications()
  const navigate = useNavigate()

  const setTokensInLocalStorageAndState = (tokens: AuthObject) => {
    const { accessToken, refreshToken } = tokens
    localStorageService.addItem(LocalStorageKey.AccessToken, accessToken)
    localStorageService.addItem(LocalStorageKey.RefreshToken, refreshToken)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    const { email, role, sub } = jwtDecode<AccessToken>(accessToken)
    setEmail(email)
    setUserRole(role)
    setUserId(sub)
  }

  const unsetTokensInLocalStorageAndState = () => {
    localStorageService.removeItem(LocalStorageKey.AccessToken)
    localStorageService.removeItem(LocalStorageKey.RefreshToken)
    setAccessToken(undefined)
    setRefreshToken(undefined)
    setEmail(undefined)
    setUserRole(undefined)
    setUserId(undefined)
  }

  const isAdmin = useMemo(() => {
    if (userRole === undefined) {
      return false
    }

    return userRole === UserRole.ADMINISTRATOR
  }, [userRole])

  const signIn = async (email: string, password: string, callback: () => void) => {
    const data = await authService.login(
      email,
      password
    )

    if (data.success) {
      setTokensInLocalStorageAndState(data.content!)
      callback()
    } else if (data.statusCode === 404) {
      triggerErrorNotification('Combination of password and user does not exist.')
    } else {
      throwError(data)
      callback()
    }
  }

  const signOut = async (callback: () => void) => {
    // Todo: do we need a signout request at all?
    unsetTokensInLocalStorageAndState()
    callback()
  }

  const forceLogOut = () => {
    unsetTokensInLocalStorageAndState()
    triggerErrorNotification('You have been logged out due to inactivity.')
    navigate('/login')
  }

  /**
   * Create a request to refresh our tokens - or force logout.
   * @param refreshToken
   */
  const fetchNewTokens = async (refreshToken: string) => {
    const data = await authService.refreshTokens(refreshToken)

    if (data.success) {
      setTokensInLocalStorageAndState(data.content!)
    } else {
      forceLogOut()
    }
  }

  /**
   * Checks whether a token is still valid and handles its refresh or force logout.
   */
  const checkAndRefreshToken = () => {
    // We only check for the token if we actually have a token
    if (!accessToken) {
      return
    }
    const decodedToken: JwtToken = jwtDecode(accessToken)

    if (tokenNeedsRefresh(decodedToken)) {
      if (refreshToken) {
        const refresh = async () => {
          await fetchNewTokens(refreshToken)
        }

        refresh()
      } else {
        forceLogOut()
      }
    }
  }

  /**
   * Handle a new page load and check whether we still have a session or not.
   */
  useEffect(() => {
    const accessToken = localStorageService.getItem(LocalStorageKey.AccessToken)
    const refreshToken = localStorageService.getItem(LocalStorageKey.RefreshToken)

    if (accessToken && refreshToken) {
      const decodedAccessToken: JwtToken = jwtDecode<AccessToken>(accessToken)
      if (tokenNeedsRefresh(decodedAccessToken)) {
        const refresh = async () => {
          await fetchNewTokens(refreshToken)
          setLoading(false)
        }

        refresh()
      } else {
        setTokensInLocalStorageAndState({ accessToken, refreshToken })
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  /**
   * Register our refresh token interval.
   */
  useInterval(checkAndRefreshToken, 2000)

  const value: AuthenticationContextType = { userId, email, isAdmin, token: accessToken, signIn, signOut }

  if (loading) {
    return <Loader/>
  }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationProvider

import React, { useEffect, useState } from 'react'
import AuthenticationContext, { AuthenticationContextType } from '../../contexts/AuthenticationContext'
import AuthService from '../../services/auth/auth-service'
import LocalStorageService from '../../services/local-storage-service'
import { LocalStorageKey } from '../../enums/LocalStorageKey'
import jwtDecode from 'jwt-decode'
import Loader from '../shared/Loader'
import { JwtToken } from '../../types/jwt-token'

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const authService: AuthService = new AuthService()
  const localStorageService: LocalStorageService = new LocalStorageService()

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
    const { token } = await authService.login(
      username,
      password
    )
    setUsername(username)
    setToken(token)

    callback()
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
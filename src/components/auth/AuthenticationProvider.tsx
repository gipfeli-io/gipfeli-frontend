import React, { useState } from 'react'
import AuthenticationContext, { AuthenticationContextType } from '../../context/AuthenticationContext'
import AuthService from '../../services/auth/auth-service'

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const authService: AuthService = new AuthService()

  const signIn = async (username: string, password: string, callback: ()=>void) => {
    // todo: handle error
    await authService.login(
      username,
      password
    )
    setUsername(username)
    callback()
  }

  const signOut = (callback: () => void) => {
    alert('signed out')
  }

  const value: AuthenticationContextType = { username, signIn, signOut }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationProvider

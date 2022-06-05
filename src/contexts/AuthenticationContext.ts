import React from 'react'

export interface AuthenticationContextType {
  username: string | undefined;
  token: string | undefined;
  signIn: (username: string, password: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}

const AuthenticationContext = React.createContext<AuthenticationContextType>(null!)

export default AuthenticationContext

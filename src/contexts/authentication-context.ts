import React from 'react'
import { AuthenticationContextType } from '../types/contexts'

/**
 * The context interface (AuthenticationContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/AuthenticationProvider.tsx, which provides functionality to login/logout a user,
 * refresh an access token and also provides useful helpers like "isAdmin" which will provide you with an easy way to control access.
 *
 * We provide the hook src/hooks/use-auth, so you can easily re-use all the functionality in your components.
 */
const AuthenticationContext = React.createContext<AuthenticationContextType>(null!)

export default AuthenticationContext

import useAuth from '../../hooks/use-auth'
import { Navigate, useLocation } from 'react-router'
import React from 'react'

type RequireAnonymousProps = {
  children: JSX.Element;
}

/**
 * Shortcut for creating pages that cannot be accessed by logged-in users (e.g. login route). Redirects to home.
 * @param children
 * @constructor
 */
const RequireAnonymous = ({ children }: RequireAnonymousProps): JSX.Element => {
  const { email } = useAuth()
  const location = useLocation()

  if (email) {
    return <Navigate to="/" state={{ from: location }} replace/>
  }

  return children
}

export default RequireAnonymous

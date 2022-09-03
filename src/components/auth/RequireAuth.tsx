import useAuth from '../../hooks/use-auth'
import { Navigate, useLocation } from 'react-router'
import React from 'react'
import { UnauthorizedAdminAccess } from '../../types/errors'

type RequireAuthProps = {
  children: JSX.Element;
  requireAdmin?: boolean;
}

/**
 * Shortcut for creating pages that can only be accessed by logged-in users (e.g. tours). Redirects to login otherwise.
 * @param children
 * @param requireAdmin If true, also checks for admin rights and raises an UnauthorizedAdminAccess exception otherwise.
 * @constructor
 */
const RequireAuth = ({ children, requireAdmin = false }: RequireAuthProps): JSX.Element => {
  const { email, isAdmin } = useAuth()
  const location = useLocation()

  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }

  if (requireAdmin && !isAdmin) {
    throw new UnauthorizedAdminAccess()
  }

  return children
}

export default RequireAuth

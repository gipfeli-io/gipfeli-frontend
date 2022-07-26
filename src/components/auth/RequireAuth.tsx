import useAuth from '../../hooks/use-auth'
import { Navigate, useLocation } from 'react-router'
import React from 'react'
import { UnauthorizedAdminAccess } from '../../types/errors'

type RequireAuthProps = {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const RequireAuth = ({ children, requireAdmin = false }: RequireAuthProps) : JSX.Element => {
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

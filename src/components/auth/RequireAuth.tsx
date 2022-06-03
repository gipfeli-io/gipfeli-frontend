import useAuth from '../../hooks/use-auth'
import { Navigate, useLocation } from 'react-router'
import React from 'react'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }

  return children
}

export default RequireAuth

import useAuth from '../../hooks/use-auth'
import { Navigate, useLocation } from 'react-router'
import React, { PropsWithChildren } from 'react'

const RequireAuth = ({ children }: PropsWithChildren<any>) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }

  return children
}

export default RequireAuth

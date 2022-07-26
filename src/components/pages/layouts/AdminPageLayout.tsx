import React from 'react'
import { Alert } from '@mui/material'
import RequireAuth from '../../auth/RequireAuth'
import { Outlet } from 'react-router'
import useConnectionStatus from '../../../hooks/use-connection-status'
import TabbedNavigation, { TabRouteLink } from '../../shared/TabbedNavigation'

const AdminPageLayout = () => {
  const { isOffline } = useConnectionStatus()
  const navBasePath = '/admin'
  const navLinks: TabRouteLink[] = [
    {
      label: 'Statistics',
      to: '',
      value: navBasePath
    },
    {
      label: 'Users',
      to: 'users',
      value: `${navBasePath}/users`
    }
  ]

  return (
    <RequireAuth requireAdmin>
      <TabbedNavigation title={'Administration'} navLinks={navLinks} navBasePath={navBasePath}>
        {isOffline()
          ? <Alert severity={'info'} sx={{ mt: 2 }}>You are offline - administration requires a working connection.</Alert>
          : <Outlet/>
        }
      </TabbedNavigation>
    </RequireAuth>
  )
}

export default AdminPageLayout

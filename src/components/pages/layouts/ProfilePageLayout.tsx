import React from 'react'
import RequireAuth from '../../auth/RequireAuth'
import { Outlet } from 'react-router'
import TabbedNavigation, { TabRouteLink } from '../../shared/TabbedNavigation'

const ProfilePageLayout = () => {
  const navBasePath = '/profile'
  const navLinks: TabRouteLink[] = [
    {
      label: 'Profile',
      to: '',
      value: navBasePath
    },
    {
      label: 'Reset',
      to: 'reset',
      value: `${navBasePath}/reset`
    }
  ]
  return (
    <RequireAuth>
      <TabbedNavigation title={'Profile'} navLinks={navLinks} navBasePath={navBasePath}>
        <Outlet/>
      </TabbedNavigation>
    </RequireAuth>
  )
}

export default ProfilePageLayout

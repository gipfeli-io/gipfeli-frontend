import React from 'react'
import { Container } from '@mui/material'
import RequireAuth from '../../auth/RequireAuth'
import Copyright from '../../shared/Copyright'
import { Outlet } from 'react-router'

function AppPageLayout () {
  return (
    <RequireAuth>
      <>
        <Container maxWidth={'lg'}>
          <Outlet/>
        </Container>
        <Copyright/>
      </>
    </RequireAuth>
  )
}

export default AppPageLayout

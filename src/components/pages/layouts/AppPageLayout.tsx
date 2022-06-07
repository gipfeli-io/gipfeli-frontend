import React from 'react'
import { Container } from '@mui/material'
import RequireAuth from '../../auth/RequireAuth'
import { Outlet } from 'react-router'

const AppPageLayout = () => {
  return (
    <RequireAuth>
      <>
        <Container maxWidth={'lg'}>
          <Outlet/>
        </Container>
      </>
    </RequireAuth>
  )
}

export default AppPageLayout

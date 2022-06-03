import React from 'react'
import { AppBar, Container, IconButton, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/NavBarUserSection'
import RequireAuth from '../../auth/RequireAuth'
import Copyright from '../../shared/Copyright'
import { Outlet } from 'react-router'

function AppPageLayout () {
  return (
    <RequireAuth>
      <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
          >
            <LandscapeIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            gipfeli.io
          </Typography>
          <NavBarUserSection></NavBarUserSection>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'lg'}>
        <Outlet />
      </Container>

      <Copyright/>
      </>
    </RequireAuth>
  )
}

export default AppPageLayout

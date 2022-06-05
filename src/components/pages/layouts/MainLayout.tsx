import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/NavBarUserSection'
import Copyright from '../../shared/Copyright'
import { Outlet } from 'react-router-dom'
import NavBarLinkSection from '../../shared/NavBarLinkSection'

function MainLayout () {
  return (
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
          <NavBarLinkSection/>
          <NavBarUserSection/>
        </Toolbar>
      </AppBar>

      <Outlet/>

      <Copyright/>
    </>
  )
}

export default MainLayout

import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/navbar/NavBarUserSection'
import Copyright from '../../shared/Copyright'
import { Link, Outlet } from 'react-router-dom'
import NavBarLinkSection from '../../shared/navbar/NavBarLinkSection'
import ThemeSwitcher from '../../shared/navbar/ThemeSwitcher'

const MainLayout = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          component={Link}
          to='/'
        >
          <LandscapeIcon/>
        </IconButton>
        <NavBarLinkSection/>
        <NavBarUserSection/>
        <ThemeSwitcher/>
      </Toolbar>
    </AppBar>

    <Outlet/>

    <Copyright/>
  </>
)

export default MainLayout

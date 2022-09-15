import * as React from 'react'
import { useMemo } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import NavBarUserActions from './NavBarUserActions'
import { Link } from 'react-router-dom'
import LandscapeIcon from '@mui/icons-material/Landscape'
import MobileNavItems from './MobileNavItems'
import DesktopNavItems from './DesktopNavItems'
import { Tooltip } from '@mui/material'
import useAuth from '../../../hooks/use-auth'
import Typography from '@mui/material/Typography'

export type NavItem = {
  label: string;
  to: string;
}

const appPages: NavItem[] = [
  {
    label: 'My Tours',
    to: '/tours'
  },
  {
    label: 'Profile',
    to: '/profile'
  }
]

const adminPage: NavItem[] = [
  {
    label: 'Admin Area',
    to: '/admin'
  }
]

const ResponsiveAppBar = () => {
  const { isLoggedIn, isAdmin } = useAuth()
  const pages = useMemo<NavItem[]>(() => {
    if (!isLoggedIn) {
      return []
    }
    if (isAdmin) {
      return [...appPages, ...adminPage]
    } else {
      return appPages
    }
  }, [isLoggedIn, isAdmin])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Tooltip title="Back to home">

            <IconButton
                size="large"
                edge="start"
                component={Link}
                to='/'
              >
                <LandscapeIcon/>
              </IconButton>
            </Tooltip>
          <Typography variant="h6" component="div">
            gipfeli.io
          </Typography>
          <MobileNavItems pages={pages}/>
          <DesktopNavItems pages={pages}/>
          <Box sx={{ flexGrow: 0 }}>
            <NavBarUserActions/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

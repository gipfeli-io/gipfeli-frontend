import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/navbar/NavBarUserSection'
import Copyright from '../../shared/Copyright'
import { Link, Outlet } from 'react-router-dom'
import NavBarLinkSection from '../../shared/navbar/NavBarLinkSection'
import ThemeSwitcher from '../../shared/navbar/ThemeSwitcher'
import useOnlineStatus from '../../../hooks/use-online-status'
import Banner from '../../shared/Banner'
import OfflineNotification from '../../shared/OfflineNotification'

const MainLayout = () => {
  const isOnline = useOnlineStatus()

  const offlineBannerContent = isOnline ? null : <OfflineNotification/>

  return (<>
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
      <Banner bannerContent={offlineBannerContent}/>
      <Outlet/>

      <Copyright/>
    </>
  )
}

export default MainLayout

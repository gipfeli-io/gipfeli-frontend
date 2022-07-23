import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/navbar/NavBarUserSection'
import Copyright from '../../shared/Copyright'
import { Link, Outlet } from 'react-router-dom'
import NavBarLinkSection from '../../shared/navbar/NavBarLinkSection'
import ThemeSwitcher from '../../shared/navbar/ThemeSwitcher'
import useConnectionStatus from '../../../hooks/use-connection-status'
import Banner from '../../shared/Banner'
import OfflineNotification from '../../shared/OfflineNotification'
import OnlineNotificationSnackbar from '../../shared/OnlineNotificationSnackbar'
import GoOnlineButton from '../../shared/navbar/GoOnlineButton'

const MainLayout = () => {
  const { isOffline } = useConnectionStatus()

  const offlineBanner = isOffline() ? <Banner bannerContent={<OfflineNotification/>}/> : null

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
          <GoOnlineButton/>
          <NavBarUserSection/>
          <ThemeSwitcher/>
        </Toolbar>
      </AppBar>
      {offlineBanner}
      <Outlet/>
      <OnlineNotificationSnackbar/>
      <Copyright/>
    </>
  )
}

export default MainLayout

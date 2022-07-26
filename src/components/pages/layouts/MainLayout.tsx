import React from 'react'
import Copyright from '../../shared/Copyright'
import { Outlet } from 'react-router-dom'
import useConnectionStatus from '../../../hooks/use-connection-status'
import Banner from '../../shared/Banner'
import OfflineNotification from '../../shared/OfflineNotification'
import OnlineNotificationSnackbar from '../../shared/OnlineNotificationSnackbar'
import ResponsiveNavBar from '../../shared/navbar/ResponsiveAppBar'

const MainLayout = () => {
  const { isOffline } = useConnectionStatus()

  const offlineBanner = isOffline() ? <Banner bannerContent={<OfflineNotification/>}/> : null

  return (<>
      <ResponsiveNavBar/>
      {offlineBanner}
      <Outlet/>
      <OnlineNotificationSnackbar/>
      <Copyright/>
    </>
  )
}

export default MainLayout

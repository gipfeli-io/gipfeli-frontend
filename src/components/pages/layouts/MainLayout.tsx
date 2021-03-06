import React from 'react'
import Footer from '../../shared/Footer'
import { Outlet } from 'react-router-dom'
import useConnectionStatus from '../../../hooks/use-connection-status'
import Banner from '../../shared/Banner'
import OfflineNotification from '../../shared/OfflineNotification'
import OnlineNotificationSnackbar from '../../shared/OnlineNotificationSnackbar'
import ResponsiveNavBar from '../../shared/navbar/ResponsiveAppBar'
import GoOnlineButton from '../../shared/GoOnlineButton'

const MainLayout = () => {
  const { isOffline } = useConnectionStatus()

  const offlineBanner = isOffline() ? <Banner bannerContent={<OfflineNotification/>}/> : null

  return (
    <>
      <GoOnlineButton/>
      <ResponsiveNavBar/>
      {offlineBanner}
      <Outlet/>
      <OnlineNotificationSnackbar/>
      <Footer/>
    </>
  )
}

export default MainLayout

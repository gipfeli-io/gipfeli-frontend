import { Navigate, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import MainLayout from '../../src/components/pages/layouts/MainLayout'
import Home from '../../src/components/pages/Home'
import Imprint from '../../src/components/pages/Imprint'
import AppPageLayout from '../../src/components/pages/layouts/AppPageLayout'
import ToursOverview from '../../src/components/pages/tours/ToursOverview'
import TourCreate from '../../src/components/pages/tours/TourCreate'
import TourEdit from '../../src/components/pages/tours/TourEdit'
import TourDetail from '../../src/components/pages/tours/TourDetail'
import ProfilePageLayout from '../../src/components/pages/layouts/ProfilePageLayout'
import Profile from '../../src/components/pages/settings/Profile'
import Reset from '../../src/components/pages/settings/Reset'
import AdminPageLayout from '../../src/components/pages/layouts/AdminPageLayout'
import Statistics from '../../src/components/pages/admin/Statistics'
import UsersOverview from '../../src/components/pages/admin/UsersOverview'
import AuthPageLayout from '../../src/components/pages/layouts/AuthPageLayout'
import Login from '../../src/components/pages/Login'
import SignUp from '../../src/components/pages/SignUp'
import PasswordReset from '../../src/components/pages/user/PasswordReset'
import SetNewPassword from '../../src/components/pages/user/SetNewPassword'
import ActivateUser from '../../src/components/pages/user/ActivateUser'
import NotFound from '../../src/components/pages/NotFound'
import React from 'react'

const routes =
  <Routes>
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="imprint" element={<Imprint/>}/>
      <Route path="tours" element={<AppPageLayout/>}>
        <Route index element={<ToursOverview/>}/>
        <Route path="create" element={<TourCreate/>}/>
        <Route path=":id/edit" element={<TourEdit/>}/>
        <Route path=":id" element={<TourDetail/>}/>
      </Route>
      <Route path="/profile" element={<ProfilePageLayout/>}>
        <Route index element={<Profile/>}/>
        <Route path="reset" element={<Reset/>}/>
      </Route>
      <Route path="/admin" element={<AdminPageLayout/>}>
        <Route index element={<Statistics/>}/>
        <Route path="users" element={<UsersOverview/>}/>
      </Route>
    </Route>
    <Route path="/" element={<AuthPageLayout/>}>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="password-reset" element={<PasswordReset/>}/>
      <Route path="password-reset/:userId/:token" element={<SetNewPassword/>}/>
      <Route path="user/activate/:userId/:token" element={<ActivateUser/>}/>
    </Route>
    <Route path="404" element={<NotFound/>}/>
    <Route path="*" element={<Navigate to="/404" replace/>}/>
  </Routes>

export default routes

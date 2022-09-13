import '@testing-library/jest-dom'
import {
  AuthenticationContextType,
  ConnectionStatusContextType,
  ErrorBoundaryContextType, NotificationContextType
} from '../../../src/types/contexts'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Navigate, Routes } from 'react-router'
import MainLayout from '../../../src/components/pages/layouts/MainLayout'
import { Route, Outlet } from 'react-router-dom'
import Home from '../../../src/components/pages/Home'
import Imprint from '../../../src/components/pages/Imprint'
import AppPageLayout from '../../../src/components/pages/layouts/AppPageLayout'
import ToursOverview from '../../../src/components/pages/tours/ToursOverview'
import TourCreate from '../../../src/components/pages/tours/TourCreate'
import TourEdit from '../../../src/components/pages/tours/TourEdit'
import TourDetail from '../../../src/components/pages/tours/TourDetail'
import ProfilePageLayout from '../../../src/components/pages/layouts/ProfilePageLayout'
import Profile from '../../../src/components/pages/settings/Profile'
import Reset from '../../../src/components/pages/settings/Reset'
import AdminPageLayout from '../../../src/components/pages/layouts/AdminPageLayout'
import Statistics from '../../../src/components/pages/admin/Statistics'
import UsersOverview from '../../../src/components/pages/admin/UsersOverview'
import RequireAuth from '../../../src/components/auth/RequireAuth'
import AuthPageLayout from '../../../src/components/pages/layouts/AuthPageLayout'
import Login from '../../../src/components/pages/Login'
import SignUp from '../../../src/components/pages/SignUp'
import PasswordReset from '../../../src/components/pages/user/PasswordReset'
import SetNewPassword from '../../../src/components/pages/user/SetNewPassword'
import ActivateUser from '../../../src/components/pages/user/ActivateUser'
import NotFound from '../../../src/components/pages/NotFound'

// mock all of the components
jest.mock('../../../src/components/pages/layouts/MainLayout.tsx',
  () => jest.fn().mockImplementation(() => <div><span>MainLayout</span><Outlet/></div>))
jest.mock('../../../src/components/pages/layouts/ProfilePageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth><><span>ProfilePageLayout</span> <Outlet/></></RequireAuth>))
jest.mock('../../../src/components/pages/layouts/AdminPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth requireAdmin><><span>AdminPageLayout</span> <Outlet/></></RequireAuth>))
jest.mock('../../../src/components/pages/layouts/AuthPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <div>AuthPageLayout <Outlet/></div>))
jest.mock('../../../src/components/pages/layouts/AppPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth><><span>AppPageLayout</span> <Outlet/></></RequireAuth>))

jest.mock('../../../src/components/pages/Home.tsx', () => jest.fn().mockImplementation(() => <div>Home</div>))
jest.mock('../../../src/components/pages/Imprint.tsx', () => jest.fn().mockImplementation(() => <div>Imprint</div>))
jest.mock('../../../src/components/pages/Login.tsx', () => jest.fn().mockImplementation(() => <div>Login</div>))
jest.mock('../../../src/components/pages/NotFound.tsx', () => jest.fn().mockImplementation(() => <div>NotFound</div>))
jest.mock('../../../src/components/pages/ServerError.tsx', () => jest.fn().mockImplementation(() => <div>ServerError</div>))
jest.mock('../../../src/components/pages/SignUp.tsx', () => jest.fn().mockImplementation(() => <div>SignUp</div>))
jest.mock('../../../src/components/pages/tours/ToursOverview.tsx', () => jest.fn().mockImplementation(() => <div>ToursOverview</div>))
jest.mock('../../../src/components/pages/tours/TourEdit.tsx', () => jest.fn().mockImplementation(() => <div>TourEdit</div>))
jest.mock('../../../src/components/pages/tours/TourCreate.tsx', () => jest.fn().mockImplementation(() => <div>TourCreate</div>))
jest.mock('../../../src/components/pages/tours/TourDetail.tsx', () => jest.fn().mockImplementation(() => <div>TourDetail</div>))
jest.mock('../../../src/components/pages/settings/Profile.tsx', () => jest.fn().mockImplementation(() => <div>Profile</div>))
jest.mock('../../../src/components/pages/settings/Reset.tsx', () => jest.fn().mockImplementation(() => <div>Reset</div>))
jest.mock('../../../src/components/pages/admin/Statistics.tsx', () => jest.fn().mockImplementation(() => <div>Statistics</div>))
jest.mock('../../../src/components/pages/admin/UsersOverview.tsx', () => jest.fn().mockImplementation(() => <div>UsersOverview</div>))
jest.mock('../../../src/components/pages/user/PasswordReset.tsx', () => jest.fn().mockImplementation(() => <div>PasswordReset</div>))
jest.mock('../../../src/components/pages/user/SetNewPassword.tsx', () => jest.fn().mockImplementation(() => <div>SetNewPassword</div>))
jest.mock('../../../src/components/pages/user/ActivateUser.tsx', () => jest.fn().mockImplementation(() => <div>ActivateUser</div>))

const mockAuthContext = {
  token: undefined,
  isLoggedIn: false,
  isAdmin: false
} as unknown as AuthenticationContextType

const mockConnectionStatusContext = {
  isOffline: () => false
} as unknown as ConnectionStatusContextType

const mockErrorHandlingContext = {
  triggerError: jest.fn()
} as unknown as ErrorBoundaryContextType

const mockNotificationContext = {
  triggerErrorNotification: jest.fn(),
  triggerOfflineNotification: jest.fn()
} as unknown as NotificationContextType

jest.mock('../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthContext))
jest.mock('../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../../src/hooks/use-error-handling', () => jest.fn().mockImplementation(() => mockErrorHandlingContext))
jest.mock('../../../src/hooks/use-notifications', () => jest.fn().mockImplementation(() => mockNotificationContext))

const setLoggedInContext = () => {
  mockAuthContext.token = 'fake_token'
  mockAuthContext.isLoggedIn = true
  mockAuthContext.email = 'hello@gipfeli.io'
}

const setAdminContext = () => {
  setLoggedInContext()
  mockAuthContext.isAdmin = true
}

const setLoggedOutContext = () => {
  mockAuthContext.token = undefined
  mockAuthContext.isLoggedIn = false
  mockAuthContext.email = undefined
  mockAuthContext.isAdmin = false
}

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

describe('Test Routes', () => {
  describe('MainLayout', () => {
    it('should render main layout on default route', () => {
      render(
      <MemoryRouter initialEntries={['/']}>
        {routes}
      </MemoryRouter>
      )

      expect(screen.queryByText('MainLayout')).toBeInTheDocument()
      expect(screen.queryByText('Home')).toBeInTheDocument()
    })

    it('should render imprint component on /imprint', () => {
      render(
      <MemoryRouter initialEntries={['/imprint']}>
        {routes}
      </MemoryRouter>
      )

      expect(screen.queryByText('Imprint')).toBeInTheDocument()
    })
  })

  describe('AppPageLayout', () => {
    beforeEach(() => {
      setLoggedOutContext()
    })

    it('should not render tours overview for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/tours']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('ToursOverview')).toBeNull()
      expect(screen.queryByText('AppPageLayout')).toBeNull()
    })

    it('should render tours overview for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/tours']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('ToursOverview')).toBeInTheDocument()
      expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
    })

    it('should not render tour create for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/tours/create']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourCreate')).toBeNull()
      expect(screen.queryByText('AppPageLayout')).toBeNull()
    })

    it('should render tour create for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/tours/create']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourCreate')).toBeInTheDocument()
      expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
    })

    it('should not render tour edit for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/tours/12344/edit']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourEdit')).toBeNull()
      expect(screen.queryByText('AppPageLayout')).toBeNull()
    })

    it('should render tour edit for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/tours/12344/edit']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourEdit')).toBeInTheDocument()
      expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
    })

    it('should not render tour detail for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/tours/12344']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourDetail')).toBeNull()
      expect(screen.queryByText('AppPageLayout')).toBeNull()
    })

    it('should render tour detail for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/tours/12344']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('TourDetail')).toBeInTheDocument()
      expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
    })
  })

  describe('ProfilePageLayout', () => {
    beforeEach(() => {
      setLoggedOutContext()
    })

    it('should not render profile for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/profile']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Profile')).toBeNull()
      expect(screen.queryByText('ProfilePageLayout')).toBeNull()
    })

    it('should render profile for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/profile']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Profile')).toBeInTheDocument()
      expect(screen.queryByText('ProfilePageLayout')).toBeInTheDocument()
    })

    it('should not render reset for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/profile/reset']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Reset')).toBeNull()
      expect(screen.queryByText('ProfilePageLayout')).toBeNull()
    })

    it('should render reset for authenticated user', () => {
      setLoggedInContext()
      render(
        <MemoryRouter initialEntries={['/profile/reset']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Reset')).toBeInTheDocument()
      expect(screen.queryByText('ProfilePageLayout')).toBeInTheDocument()
    })
  })

  describe('AdminPageLayout', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    })

    beforeEach(() => {
      setLoggedOutContext()
    })

    it('should not render admin page for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/admin']}>
          {routes}
        </MemoryRouter>
      )

      expect(screen.queryByText('Statistics')).toBeNull()
      expect(screen.queryByText('AdminPageLayout')).toBeNull()
    })

    it('should redirect logged out user to login page on accessing statistics', () => {
      render(
        <MemoryRouter initialEntries={['/admin']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Login')).toBeInTheDocument()
      expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
    })

    it('should not render admin page for authenticated user without admin rights', () => {
      setLoggedInContext()
      let exception
      try {
        render(
          <MemoryRouter initialEntries={['/admin']}>
            {routes}
          </MemoryRouter>
        )
      } catch (error) {
        exception = (error as Error).message
      }
      expect(exception).not.toBeNull()
      expect(exception).toEqual('Unauthorized admin access.')
    })

    it('should render admin page for authenticated user with admin rights', () => {
      setLoggedInContext()
      setAdminContext()
      render(
        <MemoryRouter initialEntries={['/admin']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Statistics')).toBeInTheDocument()
      expect(screen.queryByText('AdminPageLayout')).toBeInTheDocument()
    })

    it('should not render users overview for logged out user', () => {
      render(
        <MemoryRouter initialEntries={['/admin/users']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('UsersOverview')).toBeNull()
      expect(screen.queryByText('AdminPageLayout')).toBeNull()
    })

    it('should redirect logged out user to login page on accessing user overview', () => {
      render(
        <MemoryRouter initialEntries={['/admin/users']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('Login')).toBeInTheDocument()
      expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
    })

    it('should not render users overview for authenticated user without admin rights', () => {
      setLoggedInContext()
      let exception
      try {
        render(
          <MemoryRouter initialEntries={['/admin/users']}>
            {routes}
          </MemoryRouter>
        )
      } catch (error) {
        exception = (error as Error).message
      }
      expect(exception).not.toBeNull()
      expect(exception).toEqual('Unauthorized admin access.')
    })

    it('should render users overview for authenticated user with admin rights', () => {
      setLoggedInContext()
      setAdminContext()
      render(
        <MemoryRouter initialEntries={['/admin/users']}>
          {routes}
        </MemoryRouter>
      )
      expect(screen.queryByText('UsersOverview')).toBeInTheDocument()
      expect(screen.queryByText('AdminPageLayout')).toBeInTheDocument()
    })
  })

  describe('AuthPageLayout', () => {

  })

  afterAll(() => jest.restoreAllMocks())
})

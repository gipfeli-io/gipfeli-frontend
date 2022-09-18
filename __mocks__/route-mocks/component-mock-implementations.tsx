import React from 'react'
import {
  mockAuthContext,
  mockConnectionStatusContext,
  mockErrorHandlingContext,
  mockNotificationContext
} from './mock-objects'
import RequireAuth from '../../src/components/auth/RequireAuth'
import { Outlet } from 'react-router'

jest.mock('../../src/components/pages/layouts/MainLayout.tsx',
  () => jest.fn().mockImplementation(() => <div><span>MainLayout</span><Outlet/></div>))
jest.mock('.../../src/components/pages/layouts/ProfilePageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth><><span>ProfilePageLayout</span> <Outlet/></></RequireAuth>))
jest.mock('../../src/components/pages/layouts/AdminPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth requireAdmin><><span>AdminPageLayout</span> <Outlet/></></RequireAuth>))
jest.mock('../../src/components/pages/layouts/AuthPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <div>AuthPageLayout <Outlet/></div>))
jest.mock('../../src/components/pages/layouts/AppPageLayout.tsx',
  () => jest.fn().mockImplementation(() => <RequireAuth><><span>AppPageLayout</span> <Outlet/></></RequireAuth>))

jest.mock('../../src/components/pages/Home.tsx', () => jest.fn().mockImplementation(() => <div>Home</div>))
jest.mock('../../src/components/pages/Imprint.tsx', () => jest.fn().mockImplementation(() => <div>Imprint</div>))
jest.mock('../../src/components/pages/PrivacyPolicy.tsx', () => jest.fn().mockImplementation(() => <div>Privacy Policy</div>))
jest.mock('../../src/components/pages/Login.tsx', () => jest.fn().mockImplementation(() => <div>Login</div>))
jest.mock('../../src/components/pages/NotFound.tsx', () => jest.fn().mockImplementation(() => <div>NotFound</div>))
jest.mock('../../src/components/pages/ServerError.tsx', () => jest.fn().mockImplementation(() => <div>ServerError</div>))
jest.mock('../../src/components/pages/SignUp.tsx', () => jest.fn().mockImplementation(() => <div>SignUp</div>))
jest.mock('../../src/components/pages/tours/ToursOverview.tsx', () => jest.fn().mockImplementation(() => <div>ToursOverview</div>))
jest.mock('../../src/components/pages/tours/TourEdit.tsx', () => jest.fn().mockImplementation(() => <div>TourEdit</div>))
jest.mock('../../src/components/pages/tours/TourCreate.tsx', () => jest.fn().mockImplementation(() => <div>TourCreate</div>))
jest.mock('../../src/components/pages/tours/TourDetail.tsx', () => jest.fn().mockImplementation(() => <div>TourDetail</div>))
jest.mock('../../src/components/pages/settings/Profile.tsx', () => jest.fn().mockImplementation(() => <div>Profile</div>))
jest.mock('../../src/components/pages/settings/Reset.tsx', () => jest.fn().mockImplementation(() => <div>Reset</div>))
jest.mock('../../src/components/pages/admin/Statistics.tsx', () => jest.fn().mockImplementation(() => <div>Statistics</div>))
jest.mock('../../src/components/pages/admin/UsersOverview.tsx', () => jest.fn().mockImplementation(() => <div>UsersOverview</div>))
jest.mock('../../src/components/pages/user/PasswordReset.tsx', () => jest.fn().mockImplementation(() => <div>PasswordReset</div>))
jest.mock('../../src/components/pages/user/SetNewPassword.tsx', () => jest.fn().mockImplementation(() => <div>SetNewPassword</div>))
jest.mock('../../src/components/pages/user/ActivateUser.tsx', () => jest.fn().mockImplementation(() => <div>ActivateUser</div>))

jest.mock('../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthContext))
jest.mock('../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../src/hooks/use-error-handling', () => jest.fn().mockImplementation(() => mockErrorHandlingContext))
jest.mock('../../src/hooks/use-notifications', () => jest.fn().mockImplementation(() => mockNotificationContext))

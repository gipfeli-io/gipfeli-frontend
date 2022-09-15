import {
  AuthenticationContextType,
  ConnectionStatusContextType,
  ErrorBoundaryContextType, NotificationContextType
} from '../../src/types/contexts'

export const mockAuthContext = {
  token: undefined,
  isLoggedIn: false,
  isAdmin: false
} as unknown as AuthenticationContextType

export const mockConnectionStatusContext = {
  isOffline: () => false
} as unknown as ConnectionStatusContextType

export const mockErrorHandlingContext = {
  triggerError: jest.fn()
} as unknown as ErrorBoundaryContextType

export const mockNotificationContext = {
  triggerErrorNotification: jest.fn(),
  triggerOfflineNotification: jest.fn()
} as unknown as NotificationContextType

export const setLoggedInContext = () => {
  mockAuthContext.token = 'fake_token'
  mockAuthContext.isLoggedIn = true
  mockAuthContext.email = 'hello@gipfeli.io'
}

export const setAdminContext = () => {
  setLoggedInContext()
  mockAuthContext.isAdmin = true
}

export const setLoggedOutContext = () => {
  mockAuthContext.token = undefined
  mockAuthContext.isLoggedIn = false
  mockAuthContext.email = undefined
  mockAuthContext.isAdmin = false
}

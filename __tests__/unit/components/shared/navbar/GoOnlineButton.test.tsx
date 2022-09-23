import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
import 'reflect-metadata'
// @ts-ignore
import renderer from 'react-test-renderer'
import GoOnlineButton from '../../../../../src/components/shared/GoOnlineButton'
import { ConnectionStatusProvider } from '../../../../../src/components/providers/ConnectionStatusProvider'
import { ThemeContextType } from '../../../../../src/types/contexts'
import DarkMode from '../../../../../src/themes/dark-mode'

const mockConnectionStatusContext: any = {
  showGoOnlineButton: false
}

const triggerSyncFailedNotification: jest.Mock = jest.fn()
const mockNotificationContext: any = {
  triggerSyncFailedNotification
}

const mockAuthContext: any = {
  token: undefined
}

const errorBoundaryContext: any = {
  triggerError: jest.fn()
}

const mockUseLocationValue = {
  pathname: '/localhost:3000/tours',
  search: '',
  hash: '',
  state: null
}

const mockThemeContext: ThemeContextType = {
  activeTheme: DarkMode,
  toggleTheme: jest.fn()
}

jest.mock('../../../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../../../../src/hooks/use-notifications', () => jest.fn().mockImplementation(() => mockNotificationContext))
jest.mock('../../../../../src/hooks/use-theme', () => jest.fn().mockImplementation(() => mockThemeContext))
jest.mock('../../../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthContext))
jest.mock('../../../../../src/hooks/use-error-handling', () => jest.fn().mockImplementation(() => errorBoundaryContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

describe('GoOnlineButton', () => {
  it('will show button if user offline with connection', () => {
    mockConnectionStatusContext.showGoOnlineButton = true
    const tree = renderer
      .create(<ConnectionStatusProvider><GoOnlineButton/></ConnectionStatusProvider>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('will not show button if user is online', () => {
    mockConnectionStatusContext.showGoOnlineButton = false
    const tree = renderer
      .create(<ConnectionStatusProvider><GoOnlineButton/></ConnectionStatusProvider>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

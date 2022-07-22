import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
import 'reflect-metadata'
// @ts-ignore
import renderer from 'react-test-renderer'
import GoOnlineButton from '../../../../../src/components/shared/navbar/GoOnlineButton'
import { ConnectionStatusProvider } from '../../../../../src/components/providers/ConnectionStatusProvider'

const mockConnectionStatusContext: any = {
  showGoOnlineButton: false
}

const triggerSyncFailedNotification:jest.Mock = jest.fn()
const mockNotificationContext: any = {
  triggerSyncFailedNotification
}

const mockAuthContext: any = {
  token: '1234'
}
const mockUseLocationValue = {
  pathname: '/localhost:3000/tours',
  search: '',
  hash: '',
  state: null
}

jest.mock('../../../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../../../../src/hooks/use-notifications', () => jest.fn().mockImplementation(() => mockNotificationContext))
jest.mock('../../../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthContext))

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
    const tree = renderer
      .create(<ConnectionStatusProvider><GoOnlineButton/></ConnectionStatusProvider>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

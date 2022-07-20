import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import GoOnlineButton from '../../../../../src/components/shared/navbar/GoOnlineButton'

const updateConnectionStatus: jest.Mock = jest.fn()
const updateGoOnlineButtonVisibility: jest.Mock = jest.fn()
const updateOnlineInfoBannerVisibility: jest.Mock = jest.fn()
const resetOnlineInfoBanner: jest.Mock = jest.fn()
const mockConnectionStatusContext: any = {
  isOffline: false,
  updateConnectionStatus,
  updateGoOnlineButtonVisibility,
  showGoOnlineButton: false,
  isOnlineInfoBannerVisible: false,
  updateOnlineInfoBannerVisibility,
  resetOnlineInfoBanner
}

const mockUseLocationValue = {
  pathname: '/localhost:3000/tours',
  search: '',
  hash: '',
  state: null
}

jest.mock('../../../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

describe('GoOnlineButton', () => {
  it('will show button if user offline with connection', () => {
    mockConnectionStatusContext.isOffline = true
    mockConnectionStatusContext.showGoOnlineButton = true
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/currentUri']}><GoOnlineButton/></MemoryRouter>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('will not show button if user is online', () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/currentUri']}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

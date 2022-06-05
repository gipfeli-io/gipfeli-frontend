import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import NavBarUserSection from '../../../src/components/shared/NavBarUserSection'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'

const mockSignIn: jest.Mock = jest.fn()
const mockSignOut: jest.Mock = jest.fn()
const mockAuthenticationContext: any = {
  username: null,
  token: null,
  mockSignIn,
  mockSignOut
}

const mockUseLocationValue = {
  pathname: '/localhost:3000/login',
  search: '',
  hash: '',
  state: null
}

const mockUsername = 'test@gipfeli.io'
const mockToken = 'mockedToken'

jest.mock('../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthenticationContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

describe('NavBarUserSection', () => {
  describe('test with logged in user', () => {
    beforeEach(() => {
      mockAuthenticationContext.token = mockToken
      mockAuthenticationContext.username = mockUsername
    })

    it('behaves consistently when logged in', () => {
      const tree = renderer
        .create(<MemoryRouter initialEntries={['/currentUri']}><NavBarUserSection/></MemoryRouter>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
    it('shows logout button and name of user if logged in', async () => {
      mockAuthenticationContext.username = mockUsername
      mockAuthenticationContext.token = mockToken
      const { container, queryByText } = render(
    <MemoryRouter initialEntries={['/currentUri']}><NavBarUserSection/></MemoryRouter>
      )

      const logoutButton = container.querySelector('#logout-button')
      const joinButton = container.querySelector('#join-button')
      // @ts-ignore
      const greeting = queryByText('test@gipfeli.io', { exact: false })

      expect(logoutButton).toBeInTheDocument()
      expect(joinButton).not.toBeInTheDocument()
      expect(greeting).toBeInTheDocument()
    })
  })

  describe('test with logged out user', () => {
    beforeEach(() => {
      mockAuthenticationContext.token = null
      mockAuthenticationContext.username = null
    })

    it('behaves consistently when not logged in', () => {
      const tree = renderer
        .create(<MemoryRouter initialEntries={['/currentUri']}><NavBarUserSection/></MemoryRouter>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('shows login button if not logged in', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/currentUri']}><NavBarUserSection/></MemoryRouter>
      )

      const joinButton = container.querySelector('#join-button')
      const logoutButton = container.querySelector('#logout-button')

      expect(joinButton).toBeInTheDocument()
      expect(logoutButton).not.toBeInTheDocument()
    })
  })
})

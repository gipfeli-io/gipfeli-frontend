import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import NavBarUserActions from '../../../../../src/components/shared/navbar/NavBarUserActions'
import { MemoryRouter } from 'react-router'
import { fireEvent, render } from '@testing-library/react'
import { ThemeContextType } from '../../../../../src/types/contexts'
import DarkMode from '../../../../../src/themes/dark-mode'

const mockSignIn: jest.Mock = jest.fn()
const mockSignOut: jest.Mock = jest.fn()
const mockAuthenticationContext: any = {
  email: null,
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

const mockThemeContext: ThemeContextType = {
  activeTheme: DarkMode,
  toggleTheme: jest.fn()
}

const mockEmail = 'test@gipfeli.io'
const mockToken = 'mockedToken'
jest.mock('../../../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthenticationContext))
jest.mock('../../../../../src/hooks/use-theme', () => jest.fn().mockImplementation(() => mockThemeContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

describe('NavBarUserActions', () => {
  describe('test with logged in user', () => {
    beforeEach(() => {
      mockAuthenticationContext.token = mockToken
      mockAuthenticationContext.email = mockEmail
    })

    it('behaves consistently when logged in', () => {
      const tree = renderer
        .create(<MemoryRouter initialEntries={['/currentUri']}><NavBarUserActions/></MemoryRouter>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('shows logout button with name of user on hover as well as the theme switcher if logged in', async () => {
      mockAuthenticationContext.email = mockEmail
      mockAuthenticationContext.token = mockToken
      const { container, findByText } = render(
        <MemoryRouter initialEntries={['/currentUri']}><NavBarUserActions/></MemoryRouter>
      )

      const logoutButton = container.querySelector('#logout-button')
      const themeSwitcher = container.querySelector('#theme-switcher')

      expect(logoutButton).toBeInTheDocument()
      expect(themeSwitcher).toBeInTheDocument()
      fireEvent.mouseOver(logoutButton!)
      const greeting = await findByText('Logout test@gipfeli.io', { exact: false })
      expect(greeting).toBeInTheDocument()
    })
  })

  describe('test with logged out user', () => {
    beforeEach(() => {
      mockAuthenticationContext.token = null
      mockAuthenticationContext.email = null
    })

    it('behaves consistently when not logged in', () => {
      const tree = renderer
        .create(<MemoryRouter initialEntries={['/currentUri']}><NavBarUserActions/></MemoryRouter>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('shows join and login button and theme switcher if not logged in', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/currentUri']}><NavBarUserActions/></MemoryRouter>
      )

      const loginButton = container.querySelector('#login-button')
      const logoutButton = container.querySelector('#logout-button')
      const themeSwitcher = container.querySelector('#theme-switcher')

      expect(loginButton).toBeInTheDocument()
      expect(themeSwitcher).toBeInTheDocument()
      expect(logoutButton).not.toBeInTheDocument()
    })
  })
})

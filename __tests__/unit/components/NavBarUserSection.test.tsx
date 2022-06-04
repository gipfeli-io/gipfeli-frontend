import '@testing-library/jest-dom'
// @ts-ignore
import React from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import NavBarUserSection from '../../../src/components/shared/NavBarUserSection'
const mockSignIn: jest.Mock = jest.fn()
const mockSignOut: jest.Mock = jest.fn()
const mockUseContext = {
  username: 'test@gipfeli.io',
  token: 'mockedToken',
  mockSignIn,
  mockSignOut
} // jest.SpyInstance = jest.spyOn(React, 'useContext')

const mockUseLocationValue = {
  pathname: '/localhost:3000/login',
  search: '',
  hash: '',
  state: null
}

jest.mock('../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockUseContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => (jest.fn()),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue)
}))

describe('NavBarUserSection', () => {
  // const auth = renderHook(() => useAuth())

  it('behaves consistently when logged in', () => {
    const tree = renderer
      .create(<NavBarUserSection/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('behaves consistently when not logged in', () => {
    const tree = renderer
      .create(<NavBarUserSection/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('shows login button if not logged in', async () => {
    const { container } = render(
            <NavBarUserSection/>
    )

    const joinButton = container.querySelector('#join-button')
    const logoutButton = container.querySelector('#logout-button')

    expect(joinButton).toBeInTheDocument()
    expect(logoutButton).not.toBeInTheDocument()
  })

  it('shows logout button and name of user if logged in', async () => {
    const { container, queryByText } = render(
            <NavBarUserSection/>
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

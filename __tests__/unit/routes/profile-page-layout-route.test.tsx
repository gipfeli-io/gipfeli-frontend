import '@testing-library/jest-dom'
import React from 'react'
import '../../../__mocks__/route-mocks/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from '../../../__mocks__/route-mocks/routes'
import { setLoggedInContext, setLoggedOutContext } from '../../../__mocks__/route-mocks/mock-objects'

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

  afterAll(() => jest.restoreAllMocks())
})

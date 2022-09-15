import '@testing-library/jest-dom'
import React from 'react'
import './common/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from './common/routes'
import { setLoggedInContext, setLoggedOutContext } from './common/mock-objects'

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

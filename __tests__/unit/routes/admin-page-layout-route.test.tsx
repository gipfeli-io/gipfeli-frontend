import '@testing-library/jest-dom'
import React from 'react'
import './common/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from './common/routes'
import { setAdminContext, setLoggedInContext, setLoggedOutContext } from './common/mock-objects'

describe('AdminPageLayout', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
  })

  beforeEach(() => {
    setLoggedOutContext()
  })

  it('should not render admin page for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        {routes}
      </MemoryRouter>
    )

    expect(screen.queryByText('Statistics')).toBeNull()
    expect(screen.queryByText('AdminPageLayout')).toBeNull()
  })

  it('should redirect logged out user to login page on accessing statistics', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should not render admin page for authenticated user without admin rights', () => {
    setLoggedInContext()
    let exception
    try {
      render(
        <MemoryRouter initialEntries={['/admin']}>
          {routes}
        </MemoryRouter>
      )
    } catch (error) {
      exception = (error as Error).message
    }
    expect(exception).not.toBeNull()
    expect(exception).toEqual('Unauthorized admin access.')
  })

  it('should render admin page for authenticated user with admin rights', () => {
    setLoggedInContext()
    setAdminContext()
    render(
      <MemoryRouter initialEntries={['/admin']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('Statistics')).toBeInTheDocument()
    expect(screen.queryByText('AdminPageLayout')).toBeInTheDocument()
  })

  it('should not render users overview for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/admin/users']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('UsersOverview')).toBeNull()
    expect(screen.queryByText('AdminPageLayout')).toBeNull()
  })

  it('should redirect logged out user to login page on accessing user overview', () => {
    render(
      <MemoryRouter initialEntries={['/admin/users']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should not render users overview for authenticated user without admin rights', () => {
    setLoggedInContext()
    let exception
    try {
      render(
        <MemoryRouter initialEntries={['/admin/users']}>
          {routes}
        </MemoryRouter>
      )
    } catch (error) {
      exception = (error as Error).message
    }
    expect(exception).not.toBeNull()
    expect(exception).toEqual('Unauthorized admin access.')
  })

  it('should render users overview for authenticated user with admin rights', () => {
    setLoggedInContext()
    setAdminContext()
    render(
      <MemoryRouter initialEntries={['/admin/users']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('UsersOverview')).toBeInTheDocument()
    expect(screen.queryByText('AdminPageLayout')).toBeInTheDocument()
  })
  afterAll(() => jest.restoreAllMocks())
})

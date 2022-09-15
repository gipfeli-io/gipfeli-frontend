import '@testing-library/jest-dom'
import React from 'react'
import './common/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from './common/routes'

describe('AuthPageLayout', () => {
  it('should render login form', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should render sign up form', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('SignUp')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should render password reset form', () => {
    render(
      <MemoryRouter initialEntries={['/password-reset']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('PasswordReset')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should render set new password form', () => {
    render(
      <MemoryRouter initialEntries={['/password-reset/1234/5789']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('SetNewPassword')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })

  it('should render activate user page', () => {
    render(
      <MemoryRouter initialEntries={['/user/activate/1234/5789']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('ActivateUser')).toBeInTheDocument()
    expect(screen.queryByText('AuthPageLayout')).toBeInTheDocument()
  })
  afterAll(() => jest.restoreAllMocks())
})

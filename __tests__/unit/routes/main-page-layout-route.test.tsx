import '@testing-library/jest-dom'
import React from 'react'
import '../../../__mocks__/route-mocks/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from '../../../__mocks__/route-mocks/routes'

describe('MainLayout', () => {
  it('should render main layout on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('MainLayout')).toBeInTheDocument()
    expect(screen.queryByText('Home')).toBeInTheDocument()
  })

  it('should render imprint component on /imprint', () => {
    render(
      <MemoryRouter initialEntries={['/imprint']}>
        {routes}
      </MemoryRouter>
    )

    expect(screen.queryByText('Imprint')).toBeInTheDocument()
  })

  it('should render privacy policy component on /privacy-policy', () => {
    render(
      <MemoryRouter initialEntries={['/privacy-policy']}>
        {routes}
      </MemoryRouter>
    )

    expect(screen.queryByText('Privacy Policy')).toBeInTheDocument()
  })
})

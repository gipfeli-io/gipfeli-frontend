import '@testing-library/jest-dom'
import React from 'react'
import './common/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from './common/routes'

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

  afterAll(() => jest.restoreAllMocks())
})

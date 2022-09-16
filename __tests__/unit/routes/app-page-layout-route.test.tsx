import '@testing-library/jest-dom'
import React from 'react'
import '../../../__mocks__/route-mocks/component-mock-implementations'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import routes from '../../../__mocks__/route-mocks/routes'
import { setLoggedInContext, setLoggedOutContext } from '../../../__mocks__/route-mocks/mock-objects'

describe('AppPageLayout', () => {
  beforeEach(() => {
    setLoggedOutContext()
  })

  it('should not render tours overview for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/tours']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('ToursOverview')).toBeNull()
    expect(screen.queryByText('AppPageLayout')).toBeNull()
  })

  it('should render tours overview for authenticated user', () => {
    setLoggedInContext()
    render(
      <MemoryRouter initialEntries={['/tours']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('ToursOverview')).toBeInTheDocument()
    expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
  })

  it('should not render tour create for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/tours/create']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourCreate')).toBeNull()
    expect(screen.queryByText('AppPageLayout')).toBeNull()
  })

  it('should render tour create for authenticated user', () => {
    setLoggedInContext()
    render(
      <MemoryRouter initialEntries={['/tours/create']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourCreate')).toBeInTheDocument()
    expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
  })

  it('should not render tour edit for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/tours/12344/edit']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourEdit')).toBeNull()
    expect(screen.queryByText('AppPageLayout')).toBeNull()
  })

  it('should render tour edit for authenticated user', () => {
    setLoggedInContext()
    render(
      <MemoryRouter initialEntries={['/tours/12344/edit']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourEdit')).toBeInTheDocument()
    expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
  })

  it('should not render tour detail for logged out user', () => {
    render(
      <MemoryRouter initialEntries={['/tours/12344']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourDetail')).toBeNull()
    expect(screen.queryByText('AppPageLayout')).toBeNull()
  })

  it('should render tour detail for authenticated user', () => {
    setLoggedInContext()
    render(
      <MemoryRouter initialEntries={['/tours/12344']}>
        {routes}
      </MemoryRouter>
    )
    expect(screen.queryByText('TourDetail')).toBeInTheDocument()
    expect(screen.queryByText('AppPageLayout')).toBeInTheDocument()
  })
  afterAll(() => jest.resetAllMocks())
})

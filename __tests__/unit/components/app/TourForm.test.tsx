import '@testing-library/jest-dom'
import { ConnectionStatusProvider } from '../../../../src/components/providers/ConnectionStatusProvider'
import React from 'react'
import 'reflect-metadata'
import TourForm from '../../../../src/components/app/TourForm'
import { Point } from 'geojson'
import { Tour } from '../../../../src/types/tour'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

const mockConnectionStatusContext: any = {
  isOffline: () => false
}
const mockImageUploadContext: any = {
  files: [],
  currentUploads: []
}

const mockUseLocationValue = {
  pathname: '/localhost:3000',
  search: '',
  hash: '',
  state: null
}

jest.mock('../../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../../../src/hooks/use-image-upload', () => jest.fn().mockImplementation(() => mockImageUploadContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

const point = {
  type: 'Point',
  coordinates: []
} as Point

const getTour = () => {
  return new Tour('34efc307-3ee9-4dc8-8b1f-7a5893348455', 'Test Tour', point, point, 'Some Description', new Date(), new Date())
}

describe('TourForm', () => {
  it('shows map and image section if online', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/currentUri']}>
        <ConnectionStatusProvider>
          <TourForm tour={getTour()} type='Edit' saveHandler={jest.fn}/>
        </ConnectionStatusProvider>
      </MemoryRouter>)

    const mapSection = container.querySelector('#map')
    const imageSection = container.querySelector('#image-gallery')

    expect(mapSection).toBeInTheDocument()
    expect(imageSection).toBeInTheDocument()
  })

  it('hides map and image section if offline', async () => {
    mockConnectionStatusContext.isOffline = () => true
    const { container } = render(
      <MemoryRouter initialEntries={['/currentUri']}>
        <ConnectionStatusProvider>
          <TourForm tour={getTour()} type='Edit' saveHandler={jest.fn}/>
        </ConnectionStatusProvider>
      </MemoryRouter>)

    const mapSection = container.querySelector('#map')
    const imageSection = container.querySelector('#image-gallery')

    expect(mapSection).not.toBeInTheDocument()
    expect(imageSection).not.toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import { ConnectionStatusProvider } from '../../../../src/components/providers/ConnectionStatusProvider'
import React from 'react'
import 'reflect-metadata'
import TourForm from '../../../../src/components/app/TourForm'
import { Point } from 'geojson'
import { Tour } from '../../../../src/types/tour'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { TourCategory } from '../../../../src/types/tour-category'
import { act } from 'react-test-renderer'
import { FormType } from '../../../../src/enums/form-type'

const mockConnectionStatusContext: any = {
  isOffline: () => false
}
const mockImageUploadContext: any = {
  files: [],
  currentUploads: []
}

const mockGpxFileUploadContext: any = {
  file: undefined,
  currentUpload: undefined
}

const mockAuthContext: any = {
  token: 'fake_token'
}

const mockErrorHandlingContext: any = {
  triggerError: jest.fn()
}

const mockNotificationContext: any = {
  triggerErrorNotification: jest.fn(),
  triggerOfflineNotification: jest.fn()
}

const mockUseLocationValue = {
  pathname: '/localhost:3000',
  search: '',
  hash: '',
  state: null
}

const mockCategories: TourCategory[] = [
  {
    id: 'cat-1',
    name: 'CAT 1'
  },
  {
    id: 'cat-2',
    name: 'CAT 2'
  }
]

jest.mock('../../../../src/hooks/use-connection-status', () => jest.fn().mockImplementation(() => mockConnectionStatusContext))
jest.mock('../../../../src/hooks/use-image-upload', () => jest.fn().mockImplementation(() => mockImageUploadContext))
jest.mock('../../../../src/hooks/use-gpx-file-upload', () => jest.fn().mockImplementation(() => mockGpxFileUploadContext))
jest.mock('../../../../src/hooks/use-auth', () => jest.fn().mockImplementation(() => mockAuthContext))
jest.mock('../../../../src/hooks/use-error-handling', () => jest.fn().mockImplementation(() => mockErrorHandlingContext))
jest.mock('../../../../src/hooks/use-notifications', () => jest.fn().mockImplementation(() => mockNotificationContext))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router') as any,
  useNavigate: () => jest.fn(),
  useLocation: () => jest.fn().mockImplementation(() => mockUseLocationValue),
  useHref: () => jest.fn()
}))

// mock our editor component because EasyMde is complex to properly mock.
jest.mock('../../../../src/components/shared/rich-text/Editor', () => () => {
  return ''
})

const point = {
  type: 'Point',
  coordinates: []
} as Point

const getTour = () => {
  return new Tour('34efc307-3ee9-4dc8-8b1f-7a5893348455', 'Test Tour', point, point,
    'Some Description', 'cda5263c-ad01-4d39-b9ec-04ffdb7e6a77', new Date(), new Date(), mockCategories)
}

describe('TourForm', () => {
  it('shows map and image section if online', async () => {
    let renderResult: HTMLElement
    act(() => {
      const { container } = render(
        <MemoryRouter initialEntries={['/currentUri']}>
          <ConnectionStatusProvider>
            <TourForm tour={getTour()} formErrors={[]} type={FormType.EDIT} saveHandler={jest.fn}/>
          </ConnectionStatusProvider>
        </MemoryRouter>)
      renderResult = container
    })

    const mapSection = renderResult!.querySelector('#map')
    const imageSection = renderResult!.querySelector('#image-gallery')

    expect(mapSection).toBeInTheDocument()
    expect(imageSection).toBeInTheDocument()
  })

  it('hides map and image section if offline', async () => {
    mockConnectionStatusContext.isOffline = () => true
    let renderResult: HTMLElement
    act(() => {
      const { container } = render(
        <MemoryRouter initialEntries={['/currentUri']}>
          <ConnectionStatusProvider>
            <TourForm tour={getTour()} formErrors={[]} type={FormType.EDIT} saveHandler={jest.fn}/>
          </ConnectionStatusProvider>
        </MemoryRouter>)
      renderResult = container
    })

    const mapSection = renderResult!.querySelector('#map')
    const imageSection = renderResult!.querySelector('#image-gallery')

    expect(mapSection).not.toBeInTheDocument()
    expect(imageSection).not.toBeInTheDocument()
  })
})

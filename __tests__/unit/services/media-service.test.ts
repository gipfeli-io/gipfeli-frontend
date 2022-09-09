import MediaService from '../../../src/services/media/media-service'
import { RequestBody } from '../../../src/types/api'
import fetchMock from 'jest-fetch-mock'
import { GpxFileUpload, ImageUpload } from '../../../src/types/media'

const mockImage = {
  type: 'png',
  name: 'mock-image'
} as unknown as File

const mockGpxFile = {
  type: 'gpx',
  name: 'mock-gpx'
} as unknown as File

const mockToken = 'mock-token'

const mockImageUploadResponse = {
  id: 'image-id',
  identifier: 'image-identifier',
  location: null
} as unknown as ImageUpload

const mockGpxFileUploadResponse = {
  id: 'gpx-file-id',
  identifier: 'gpx-file-identifier',
  name: 'gpx-file-name'
} as unknown as GpxFileUpload

class MediaServiceWrapper extends MediaService {
  constructor (accessToken?: string) {
    super(accessToken)
    this.accessToken = accessToken
  }

  getRequestBody (method: 'POST', file: File): RequestBody {
    return super.getRequestBody(method, file)
  }
}

describe('MediaService', () => {
  beforeEach(() => {
    fetchMock.enableMocks()
    fetchMock.resetMocks()
  })

  it('calls image upload correctly', async () => {
    const service = new MediaService(mockToken)
    const mockFormData = new FormData()
    mockFormData.append('file', mockImage)

    fetchMock.mockResponseOnce(JSON.stringify(mockImageUploadResponse))

    await service.uploadImage(mockImage)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(mockFormData)
  })

  it('calls gpx file upload correctly', async () => {
    const service = new MediaService(mockToken)
    const mockFormData = new FormData()
    mockFormData.append('file', mockGpxFile)

    fetchMock.mockResponseOnce(JSON.stringify(mockGpxFileUploadResponse))

    await service.uploadGpxFile(mockGpxFile)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST')
    // @ts-ignore
    expect(fetchMock.mock.calls[0][1]?.headers?.Authorization).toContain(`Bearer ${mockToken}`)
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(mockFormData)
  })

  it('creates correct POST request body', () => {
    const wrapper = new MediaServiceWrapper(mockToken)
    const mockFormData = new FormData()
    mockFormData.append('file', mockImage)

    const result = wrapper.getRequestBody('POST', mockImage)

    const expected: RequestBody = {
      headers: {
        Authorization: `Bearer ${mockToken}`
      },
      method: 'POST',
      body: mockFormData
    }

    expect(result).toEqual(expected)
  })
})

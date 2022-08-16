import APIService from '../api-service'
import { RequestBody, SingleApiResponse } from '../../types/api'
import { GpxFileUpload, ImageUpload } from '../../types/media'

export default class MediaService extends APIService {
  private prefix: string = 'media'

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
  }

  public async uploadImage (image: File): Promise<SingleApiResponse<ImageUpload>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'upload-image'),
      this.getRequestBody('POST', image, 'image'),
      ImageUpload
    )
  }

  public async uploadGpxFile (gpxFile: File): Promise<SingleApiResponse<GpxFileUpload>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, 'upload-gpx-file'),
      this.getRequestBody('POST', gpxFile, 'gpxFile'),
      GpxFileUpload
    )
  }

  protected getRequestBody (method: 'POST' | 'DELETE', file: File, fieldName: string): RequestBody {
    // Get the auth token header from the parent method, we'll override the content here for handling file uploads
    const fileUploadBody = super.getRequestBody(method)

    const content = new FormData()
    content.append(fieldName, file)
    // Unset content-type to force fetch to set the content-type according to the uploaded file
    fileUploadBody.headers = { Authorization: fileUploadBody.headers.Authorization }
    fileUploadBody.body = content

    return fileUploadBody
  }
}

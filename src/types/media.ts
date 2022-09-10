import { GeoJsonObject, Point } from 'geojson'
import { GeometryObject } from './map'

/**
 * Base MediaObject - all media files have an ID and an identifier for the given storage.
 */
interface MediaObject {
  id: string;
  identifier: string;
}

/**
 * An uploaded image that might or might not have a location.
 */
export class ImageUpload extends GeometryObject implements MediaObject {
  id: string
  identifier: string
  location?: Point | null

  constructor (id: string, identifier: string, location: Point | null = null) {
    super()
    this.id = id
    this.identifier = identifier
    this.location = location
  }

  public getGeometry (): GeoJsonObject | null {
    return this.location ?? null
  }
}

export class GpxFileUpload implements MediaObject {
  id: string
  identifier: string
  name: string

  constructor (id: string, identifier: string, name: string) {
    this.id = id
    this.identifier = identifier
    this.name = name
  }
}

export interface UploadError {
  reason: string;
}
export interface CurrentUpload {
  name: string
  error?: UploadError
}

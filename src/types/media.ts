/**
 * Base MediaObject - all media files have an ID and an identifier for the given storage.
 */
import { Point } from 'geojson'

interface MediaObject {
  id: string;
  identifier: string;
}

export class ImageUpload implements MediaObject {
  id: string
  identifier: string
  location?: Point | null

  constructor (id: string, identifier: string, location: Point | null = null) {
    this.id = id
    this.identifier = identifier
    this.location = location
  }
}

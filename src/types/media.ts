/**
 * Base MediaObject - all media files have an ID and an identifier for the given storage.
 */
interface MediaObject {
  id: string;
  identifier: string;
}

export class ImageUpload implements MediaObject {
  id: string
  identifier: string

  constructor (id: string, identifier: string) {
    this.id = id
    this.identifier = identifier
  }
}

/**
 * Returns the full cloud storage bucket URL for a given identifier.
 * @param identifier
 */
const getCloudStorageUrlForIdentifier: (identifier: string) => string = (identifier: string) => {
  return `${process.env.REACT_APP_STORAGE_BUCKET_BASE_URL + identifier}`
}

export default getCloudStorageUrlForIdentifier

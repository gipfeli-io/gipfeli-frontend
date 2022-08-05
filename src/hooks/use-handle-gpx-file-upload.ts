import MediaService from '../services/media/media-service'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import useApiError from './use-api-error'
import { CurrentUpload, GpxFileUpload, UploadError } from '../types/media'

const useHandleGpxFileUpload = (mediaService: MediaService, record: GpxFileUpload, setRecord: Dispatch<SetStateAction<GpxFileUpload>>) => {
  const throwError = useApiError()
  const [currentGpxUpload, setCurrentGpxUpload] = useState<CurrentUpload>(null!)

  /**
   * Removes a sucessfully uploaded file from the currently running uploads.
   * @param name
   */
  const handleSuccess = (name: string) => {
    setCurrentGpxUpload(prevState => ({
      ...prevState,
      name
    }))
  }

  /**
   * Adds an error message to the uploaded file (which failed).
   * @param error
   */
  const handleError = (error: string | undefined) => {
    const uploadError: UploadError = { reason: error ?? 'Failure.' }
    setCurrentGpxUpload(prevState => ({
      ...prevState,
      error: uploadError
    }))
  }

  const handleGpxFileUpload = useCallback(
    async (uploadedGpxFile: File) => {
      setCurrentGpxUpload(prevState => ({
        ...prevState,
        name: uploadedGpxFile.name
      }))

      mediaService.uploadGpxFile(uploadedGpxFile).then((data) => {
        if (data.success) {
          setRecord(prevState => ({ ...prevState, data }))
          handleSuccess(uploadedGpxFile.name)
        } else {
          const message = data.error?.message
          Array.isArray(message)
            ? handleError('Something bad happened')
            : handleError(message)
          throwError(data, false)
        }
      })
    }, [record])

  return {
    currentGpxUpload, handleGpxFileUpload
  }
}

export default useHandleGpxFileUpload

import MediaService from '../services/media/media-service'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import useApiError from './use-api-error'
import { CurrentUpload, GpxFileUpload, UploadError } from '../types/media'
import useErrorHandling from './use-error-handling'

const useHandleGpxFileUpload = (mediaService: MediaService, record: GpxFileUpload|undefined, setRecord: Dispatch<SetStateAction<GpxFileUpload|undefined>>) => {
  const throwError = useApiError()
  const { triggerError } = useErrorHandling()
  const [currentGpxUpload, setCurrentGpxUpload] = useState<CurrentUpload>(null!)

  /**
   * Removes a successfully uploaded file from the currently running uploads.
   */
  const handleSuccess = () => {
    setCurrentGpxUpload(null!)
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
        name: uploadedGpxFile.name,
        error: undefined
      }))
      setRecord(undefined)

      try {
        const data = await mediaService.uploadGpxFile(uploadedGpxFile)

        if (data.success) {
          setRecord(data.content)
          handleSuccess()
        } else {
          const message = data.error?.message
          Array.isArray(message)
            ? handleError('Something bad happened')
            : handleError(message)
          throwError(data, false)
        }
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }, [record])

  return {
    currentGpxUpload, handleGpxFileUpload
  }
}

export default useHandleGpxFileUpload

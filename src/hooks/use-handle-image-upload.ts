import MediaService from '../services/media/media-service'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import useApiError from './use-api-error'
import { CurrentUpload, ImageUpload, UploadError } from '../types/media'
import useErrorHandling from './use-error-handling'

const useHandleImageUpload = (mediaService: MediaService, records: ImageUpload[], setRecords: Dispatch<SetStateAction<ImageUpload[]>>) => {
  const throwError = useApiError()
  const { triggerError } = useErrorHandling()
  const [currentUploads, setCurrentUploads] = useState<CurrentUpload[]>([])

  /**
   * Removes a sucessfully uploaded file from the currently running uploads.
   * @param name
   */
  const handleSuccess = (name: string) => {
    setCurrentUploads(prevState => [...prevState.filter((item) => item.name !== name)])
  }

  /**
   * Adds an error message to the uploaded file (which failed).
   * @param name
   * @param error
   */
  const handleError = (name: string, error: string | undefined) => {
    const uploadError: UploadError = { reason: error ?? 'Failure.' }
    setCurrentUploads(prevState => {
      return prevState.map((item) => {
        return item.name === name ? { ...item, error: uploadError } : item
      })
    })
  }

  const handleImageUpload = useCallback(
    async (uploadedImages: File[]) => {
      setCurrentUploads(prevState => [
        ...prevState,
        ...uploadedImages.map((image) => ({ name: image.name }))
      ])

      for (const uploadedImage of uploadedImages) {
        try {
          const data = await mediaService.uploadImage(uploadedImage)
          if (data.success) {
            setRecords(prevState => [...prevState, data.content!])
            handleSuccess(uploadedImage.name)
          } else {
            const message = data.error?.message
            Array.isArray(message)
              ? handleError(uploadedImage.name, 'Something bad happened')
              : handleError(uploadedImage.name, message)
            throwError(data, false)
          }
        } catch (error: unknown) {
          triggerError(error as Error)
        }
      }
    }, [records])

  return {
    currentUploads, handleImageUpload
  }
}

export default useHandleImageUpload

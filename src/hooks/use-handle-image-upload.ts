import MediaService from '../services/media/media-service'
import { Dispatch, SetStateAction, useCallback } from 'react'
import useApiError from './use-api-error'
import { ImageUpload } from '../types/media'

const useHandleImageUpload = (mediaService: MediaService, records: ImageUpload[], setRecords: Dispatch<SetStateAction<ImageUpload[]>>) => {
  const throwError = useApiError()
  return useCallback(
    async (uploadedImages: File[]) => {
      for (const uploadedImage of uploadedImages) {
        const data = await mediaService.uploadImage(uploadedImage)

        if (data.success) {
          setRecords(prevState => [...prevState, data.content!])
        } else {
          throwError(data, false)
        }
      }
    }, [records])
}

export default useHandleImageUpload

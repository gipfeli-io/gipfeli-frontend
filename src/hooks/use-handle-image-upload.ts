import MediaService from '../services/media/media-service'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import useApiError from './use-api-error'
import { ImageUpload } from '../types/media'

const useHandleImageUpload = (mediaService: MediaService, records: ImageUpload[], setRecords: Dispatch<SetStateAction<ImageUpload[]>>) => {
  const throwError = useApiError()
  const [currentUploads, setCurrentUploads] = useState<string[]>([])

  const handleImageUpload = useCallback(
    async (uploadedImages: File[]) => {
      setCurrentUploads(prevState => [...prevState, ...uploadedImages.map((image) => image.name)])

      for (const uploadedImage of uploadedImages) {
        mediaService.uploadImage(uploadedImage).then((data) => {
          if (data.success) {
            setRecords(prevState => [...prevState, data.content!])
          } else {
            throwError(data, false)
          }

          setCurrentUploads(prevState => [...prevState.filter((item) => item !== uploadedImage.name)])
        })
      }
    }, [records])

  return {
    currentUploads, handleImageUpload
  }
}

export default useHandleImageUpload

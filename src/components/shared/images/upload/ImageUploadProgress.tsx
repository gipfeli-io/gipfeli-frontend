import React, { useEffect, useState } from 'react'
import useImageUpload from '../../../../hooks/use-image-upload'
import { Stack } from '@mui/material'
import ImageUploadErrorList, { ImageUploadErrorListItem } from './ImageUploadErrorList'
import MediaUploadIndicator from '../../media/upload/MediaUploadIndicator'

const ImageUploadProgress = () => {
  const { currentUploads } = useImageUpload()
  const [uploadErrors, setUploadErrors] = useState<ImageUploadErrorListItem[]>([])

  useEffect(() => {
    const errors: ImageUploadErrorListItem[] = currentUploads
      .filter((item) => item.error?.reason)
      .map((error) => ({ file: error.name, reason: error.error!.reason }))
    setUploadErrors(() => errors)
  }, [currentUploads])

  return (
    <>
      {uploadErrors.length > 0 &&
          <ImageUploadErrorList uploadErrors={uploadErrors}/>
      }
      <Stack>
        {
          currentUploads.map((upload, index) => {
            return !upload.error ? <MediaUploadIndicator key={index} upload={upload}/> : ''
          })
        }
      </Stack>
    </>
  )
}

export default ImageUploadProgress

import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import MediaUploadIndicator from './MediaUploadIndicator'
import useGpxFileUpload from '../../../../hooks/use-gpx-file-upload'
import MediaUploadErrorList, { MediaUploadErrorListItem } from './MediaUploadErrorList'

const MediaUploadProgress = () => {
  const { currentUploads } = useGpxFileUpload()
  const [uploadErrors, setUploadErrors] = useState<MediaUploadErrorListItem[]>([])

  useEffect(() => {
    const errors: MediaUploadErrorListItem[] = currentUploads
      .filter((item) => item.error?.reason)
      .map((error) => ({ file: error.name, reason: error.error!.reason }))
    setUploadErrors(() => errors)
  }, [currentUploads])

  return (
    <>
      {uploadErrors.length > 0 &&
          <MediaUploadErrorList uploadErrors={uploadErrors}/>
      }
      <Stack>
        {
          currentUploads.map((upload) => {
            return !upload.error ? <MediaUploadIndicator key={upload.name} upload={upload}/> : ''
          })
        }
      </Stack>
    </>
  )
}

export default MediaUploadProgress

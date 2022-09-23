import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import MediaUploadIndicator from '../../media/upload/MediaUploadIndicator'
import useGpxFileUpload from '../../../../hooks/use-gpx-file-upload'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'

export type GpxUploadErrorListItem = {
  file: string
  reason: string
}

const GpxFileUploadProgress = () => {
  const { currentUpload } = useGpxFileUpload()
  const [uploadError, setUploadError] = useState<GpxUploadErrorListItem | null>(null)

  useEffect(() => {
    if (currentUpload && currentUpload.error?.reason) {
      setUploadError({
        file: currentUpload.name,
        reason: currentUpload.error.reason
      })
    } else {
      setUploadError(null)
    }
  }, [currentUpload])

  return (
    <>
      {uploadError &&
          <Typography key={uploadError.file} variant="caption" component="div" color={'error'}>
              <ErrorIcon fontSize="inherit"/> {uploadError.file} failed: {uploadError.reason}
          </Typography>
      }
      <Stack>
        {
          currentUpload && !currentUpload.error
            ? <MediaUploadIndicator key={currentUpload.name} upload={currentUpload}/>
            : ''
        }
      </Stack>
    </>
  )
}

export default GpxFileUploadProgress

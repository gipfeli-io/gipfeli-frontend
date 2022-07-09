import React from 'react'
import useImageUpload from '../../../../hooks/use-image-upload'
import { CircularProgress, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

const ImageUploadProgress = () => {
  const { currentUploads } = useImageUpload()
  // todo: fix alignment of loader
  return (
    <Stack direction={'row'} gap={1}>
      {
        currentUploads.map((upload) => {
          return (
          <Stack key={upload} direction={'row'} gap={1}>
            <CircularProgress size={'1vh'}/>
            <Typography variant="caption" component="span">
              {upload}
            </Typography>
          </Stack>
          )
        })
      }
    </Stack>
  )
}

export default ImageUploadProgress

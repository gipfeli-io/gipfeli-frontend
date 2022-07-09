import { CurrentUpload } from '../../../../types/media'
import { CircularProgress, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

type ImageUploadIndicatorProps = {
  upload: CurrentUpload
}

const ImageUploadIndicator = ({ upload }: ImageUploadIndicatorProps) => {
  return (
    <Stack direction={'row'} gap={1}>
      <CircularProgress size={'1vh'}/>
      <Typography variant="caption" component="span">
        {upload.name}
      </Typography>
    </Stack>
  )
}

export default ImageUploadIndicator

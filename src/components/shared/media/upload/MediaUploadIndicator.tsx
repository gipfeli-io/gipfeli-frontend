import { CurrentUpload } from '../../../../types/media'
import { CircularProgress, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

type MediaUploadIndicatorProps = {
  upload: CurrentUpload
}

const MediaUploadIndicator = ({ upload }: MediaUploadIndicatorProps) => {
  return (
    <Stack direction={'row'} gap={1}>
      <CircularProgress size={'1vh'}/>
      <Typography variant="caption" component="span">
        {upload.name}
      </Typography>
    </Stack>
  )
}

export default MediaUploadIndicator

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import React from 'react'

export type MediaUploadErrorListItem = {
  file: string
  reason: string
}

type MediaUploadErrorListProps = {
  uploadErrors: MediaUploadErrorListItem[]
}

const MediaUploadErrorList = ({ uploadErrors }: MediaUploadErrorListProps) => {
  return (
    <Accordion sx={{ mb: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
      >
        <Typography color="error">
          <ErrorIcon fontSize="inherit"/> Some uploads failed!
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {uploadErrors.map((error) => {
          return (
            <Typography key={error.file} variant="caption" component="div" color={'error'}>
              <ErrorIcon fontSize="inherit"/> {error.file} failed: {error.reason}
            </Typography>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default MediaUploadErrorList

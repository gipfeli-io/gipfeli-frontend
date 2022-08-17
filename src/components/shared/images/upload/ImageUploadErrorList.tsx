import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import ErrorIcon from '@mui/icons-material/Error'
import React from 'react'

export type ImageUploadErrorListItem = {
  file: string
  reason: string
}

type ImageUploadErrorListProps = {
  uploadErrors: ImageUploadErrorListItem[]
}

const ImageUploadErrorList = ({ uploadErrors }: ImageUploadErrorListProps) => {
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
        {uploadErrors.map((error, index) => {
          return (
            <Typography key={index} variant="caption" component="div" color={'error'}>
              <ErrorIcon fontSize="inherit"/> {error.file} failed: {error.reason}
            </Typography>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default ImageUploadErrorList

import React from 'react'
import { Grid, IconButton, Link } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import useGpxFileUpload from '../../../../hooks/use-gpx-file-upload'
import DescriptionIcon from '@mui/icons-material/Description'

const GpxFileUploadEntry = () => {
  const { file, remove } = useGpxFileUpload()

  if (!file) {
    return <></>
  }

  return (
    <>
      <Typography variant="h6" component="div">
        Currently uploaded gpx file:
      </Typography>
      <Grid container mb={2} direction={'row'} spacing={4} alignItems="center">
        <Grid item>
          <Link underline="none" color="primary" href={getCloudStorageUrlForIdentifier(file.identifier)}>
            <DescriptionIcon sx={{ verticalAlign: 'bottom' }}/> <span className="gpx-file-name">{file.name}</span>
          </Link>
        </Grid>
        <Grid item>
          <IconButton
            color="error"
            onClick={() => remove(file.id)}
          >
            <Delete/>
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

export default GpxFileUploadEntry

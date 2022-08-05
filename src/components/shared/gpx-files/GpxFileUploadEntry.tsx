import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../utils/storage-helper'
import useGpxFileUpload from '../../../hooks/use-gpx-file-upload'
import { GpxFileUpload } from '../../../types/media'
import DescriptionIcon from '@mui/icons-material/Description'
import { Link } from 'react-router-dom'

const GpxFileUploadEntry = () => {
  const { files, remove } = useGpxFileUpload()

  if (!files) {
    return <></>
  }
  const gpxUpload = files as GpxFileUpload

  return (
    <>
      <Typography variant="h6" component="div">
        Currently uploaded gpx file:
      </Typography>
      <div>
        <Link to={getCloudStorageUrlForIdentifier(gpxUpload.identifier)}><DescriptionIcon/> {gpxUpload.id}</Link>
      </div>
      <div>
        <Tooltip title={'Delete image'}>
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            onClick={() => remove(gpxUpload.id)}
          >
            <Delete/>
          </IconButton>
        </Tooltip>
      </div>
    </>
  )
}

export default GpxFileUploadEntry

import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import useGpxFileUpload from '../../../../hooks/use-gpx-file-upload'
import DescriptionIcon from '@mui/icons-material/Description'
import { Link } from 'react-router-dom'

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
      <div>
        <Link to={getCloudStorageUrlForIdentifier(file.identifier)}><DescriptionIcon/> {file.id}</Link>
      </div>
      <div>
        <Tooltip title={'Delete image'}>
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            onClick={() => remove(file.id)}
          >
            <Delete/>
          </IconButton>
        </Tooltip>
      </div>
    </>
  )
}

export default GpxFileUploadEntry

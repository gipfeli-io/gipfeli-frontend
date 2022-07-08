import React from 'react'
import useImageUpload from '../../../../hooks/use-image-upload'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'

const ImageUploadEntries = () => {
  const { files, remove } = useImageUpload()

  if (files.length === 0) {
    return <></>
  }

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Currently uploaded images:
      </Typography>
      <ImageList cols={6} gap={8}>
        {files.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={getCloudStorageUrlForIdentifier(item.identifier)}
              alt={item.identifier}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  onClick={() => remove(item.id)}
                >
                  <Delete/>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}

export default ImageUploadEntries

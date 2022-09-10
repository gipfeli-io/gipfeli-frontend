import React from 'react'
import useImageUpload from '../../../../hooks/use-image-upload'
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { Delete, LocationOff, LocationOn } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import GeoReferenceIndicator from './GeoReferenceIndicator'

const ImageUploadEntries = () => {
  const { files, remove } = useImageUpload()
  if (!files || files.length === 0) {
    return <></>
  }

  return (
    <>
      <Typography variant="h6" component="div">
        Currently uploaded images:
      </Typography>
      <Typography variant="caption" component="div">
        Geo-referenced images will be placed on the map directly. Images with successfully extracted coordinates are
        marked with <LocationOn fontSize={'inherit'}/>, otherwise with <LocationOff fontSize={'inherit'}/>.
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
              subtitle={<GeoReferenceIndicator isGeoReferenced={!!item.location}/>}
              actionIcon={
                <Tooltip title={'Delete image'}>
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    onClick={() => remove(item.id)}
                  >
                    <Delete/>
                  </IconButton>
                </Tooltip>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}

export default ImageUploadEntries

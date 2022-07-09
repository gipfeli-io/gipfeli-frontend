import React from 'react'
import useImageUpload from '../../../../hooks/use-image-upload'
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { Delete, LocationOn, LocationOff } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'

type GeoReferenceIndicatorProps = {
  isGeoReferenced: boolean
}

const GeoReferenceIndicator = ({ isGeoReferenced }:GeoReferenceIndicatorProps) => {
  const title = isGeoReferenced ? 'Coordinates found' : 'No coordinates found'
  return (
    <Tooltip title={title}>
      {isGeoReferenced
        ? <LocationOn sx={{ color: 'rgba(255, 255, 255, 0.54)' }} />
        : <LocationOff sx={{ color: 'rgba(255, 255, 255, 0.54)' }} />
      }
    </Tooltip>
  )
}

const ImageUploadEntries = () => {
  const { files, remove } = useImageUpload()

  if (files.length === 0) {
    return <></>
  }

  return (
    <>
      <Typography variant="h6" component="div">
        Currently uploaded images:
      </Typography>
      <Typography variant="caption" component="div">
        Geo-referenced images will be placed on the map directly. Successful coordinate extraction is marked
        with  <LocationOn fontSize={'inherit'}/>.
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
              subtitle={item.location ? <GeoReferenceIndicator isGeoReferenced /> : <GeoReferenceIndicator isGeoReferenced={false}/>}
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

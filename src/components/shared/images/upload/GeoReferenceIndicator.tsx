import { Tooltip } from '@mui/material'
import { LocationOff, LocationOn } from '@mui/icons-material'
import React from 'react'

type GeoReferenceIndicatorProps = {
  isGeoReferenced: boolean
}

const GeoReferenceIndicator = ({ isGeoReferenced }: GeoReferenceIndicatorProps) => {
  const title = isGeoReferenced ? 'Coordinates found' : 'No coordinates found'
  return (
    <Tooltip title={title}>
      {isGeoReferenced
        ? <LocationOn sx={{ color: 'rgba(255, 255, 255, 0.54)' }}/>
        : <LocationOff sx={{ color: 'rgba(255, 255, 255, 0.54)' }}/>
      }
    </Tooltip>
  )
}

export default GeoReferenceIndicator

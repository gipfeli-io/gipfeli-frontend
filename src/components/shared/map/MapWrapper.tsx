import React, { PropsWithChildren, useEffect, useId, useState } from 'react'
import { Map, View } from 'ol'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import styles from './MapWrapper.module.scss'
import Typography from '@mui/material/Typography'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import MapConfigurationService from '../../../services/map/map-configuration-service'
import MapProvider from '../../providers/MapProvider'

const MapWrapper = ({ children }: PropsWithChildren<any>) => {
  const mapContainerId = useId()
  const [map, setMap] = useState<Map | undefined>(undefined)

  useEffect(() => {
    const initialMap = new Map({
      target: mapContainerId,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View(MapConfigurationService.getMapViewOptions())
    })

    setMap(initialMap)
    return () => initialMap.dispose() // Cleans up when the component is dismounted.
  }, [mapContainerId])

  return (
    <>
      <div id={mapContainerId} className={styles.mapContainer}>
        {map &&
            <MapProvider map={map}>
              {children}
            </MapProvider>
        }
      </div>
      <Typography variant="caption" component="div">
        Click on a <CameraIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }}/> pin to show its image, and
        click on the image to open its original. <AccountTreeIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }}/> is
        a cluster of images, which spread open when clicked. If an image is part of a cluster, its tooltip will point
        at the actual location of the image.
      </Typography>
    </>
  )
}

export default MapWrapper

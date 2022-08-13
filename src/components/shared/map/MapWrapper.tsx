import React, { PropsWithChildren, useEffect, useId, useState } from 'react'
import { Map, View } from 'ol'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import { TileWMS } from 'ol/source'
import styles from './MapWrapper.module.scss'
import MapContext from './MapContext'
import { CoordinateSystems } from '../../../enums/coordinate-systems'
import Typography from '@mui/material/Typography'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import AccountTreeIcon from '@mui/icons-material/AccountTree'

const MapWrapper = ({ children }: PropsWithChildren<any>) => {
  const mapContainerId = useId()
  const [map, setMap] = useState<Map | undefined>(undefined)

  useEffect(() => {
    const initialMap = new Map({
      target: mapContainerId,
      layers: [
        new TileLayer({
          source: new TileWMS({ // todo: add these values to a config file or get them from a config service
            crossOrigin: 'anonymous',
            params: {
              LAYERS: 'ch.swisstopo.pixelkarte-farbe',
              FORMAT: 'image/jpeg'
            },
            url: 'https://wms.geo.admin.ch/',
            projection: CoordinateSystems.MAP
          })
        })
      ],
      view: new View({
        projection: CoordinateSystems.MAP,
        center: [916355.758968, 5909242.750142],
        zoom: 8,
        minZoom: 8
      }),
      controls: []
    })

    setMap(initialMap)
    return () => initialMap.dispose() // Cleans up when the component is dismounted.
  }, [mapContainerId])

  return (
    <MapContext.Provider value={{ map }}>
      <div id={mapContainerId} className={styles.mapContainer}>
        {children}
      </div>
      <Typography variant="caption" component="div">
        Click on a <CameraIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }}/> pin to show its image, and
        click on the image to open its original. <AccountTreeIcon fontSize="inherit" sx={{ verticalAlign: 'middle' }}/> is
        a cluster of images, which spread open when clicked. If an image is part of a cluster, its tooltip will point
        at the actual location of the image.
      </Typography>
      <div className="map-profile"></div>
    </MapContext.Provider>
  )
}

export default MapWrapper

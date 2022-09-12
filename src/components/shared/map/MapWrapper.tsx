import React, { PropsWithChildren, useId, useLayoutEffect, useState } from 'react'
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

  /**
   * Notice that we use useLayoutEffect() instead of useEffect(). The reason for this is that when we call dispose() on
   * the map object while a user is hovering over an instance of ol-ext's Hover interaction (e.g. GPX track), so e.g.
   * when the user hovers and then hits the return button; in that moment ol-ext needs to have the DOM present to get
   * the default cursor (see https://github.com/Viglino/ol-ext/blob/master/src/interaction/Hover.js#L66). When we use
   * useEffect(), ol-ext calls getTargetElement() on the map object, but at that point, the target element is already
   * removed from the DOM.
   *
   * Note: It would actually be better if ol-ext would not be DOM-dependent, i.e. falling back to a default cursor.
   */
  useLayoutEffect(() => {
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

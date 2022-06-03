import React, { PropsWithChildren, useEffect, useId, useState } from 'react'
import { Map, View } from 'ol'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import { TileWMS } from 'ol/source'
import styles from './MapWrapper.module.scss'
import MapContext from './MapContext'

const MapWrapper = ({ children }: PropsWithChildren<{}>) => {
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
            projection: 'EPSG:3857'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [916355.758968, 5909242.750142],
        zoom: 8,
        minZoom: 8
      }),
      controls: [
      ]
    })

    setMap(initialMap)
    return () => initialMap.dispose() // Cleans up when the component is dismounted.
  }, [mapContainerId])

  return (
        <MapContext.Provider value={{ map }}>
            <div id={mapContainerId} className={styles.mapContainer}>
                {children}
            </div>
        </MapContext.Provider>
  )
}

export default MapWrapper

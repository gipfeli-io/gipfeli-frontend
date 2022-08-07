import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import 'ol-ext/dist/ol-ext.css'
import { GpxFileUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import { GPX } from 'ol/format'
import { FeatureLike } from 'ol/Feature'
import { Fill, Stroke } from 'ol/style'
import Profile from 'ol-ext/style/Profile'
import { Geometry } from 'ol/geom'

type GpsMarkerLayerProps = {
  gpxFile?: GpxFileUpload,
}

/**
 * Adds a layer which can display data from a gpx file.
 */
const GpxDataLayer = ({ gpxFile }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map || !gpxFile) {
      return
    }

    const gpxDataLayer = new VectorLayer({
      source: new VectorSource({
        url: getCloudStorageUrlForIdentifier(gpxFile.identifier),
        format: new GPX()
      }),
      style: (feature: FeatureLike) => {
        console.log('feature', feature.getGeometry() as Geometry)
        return new Profile({
          geometry: feature.getGeometry() as Geometry,
          scale: 4,
          fill: new Fill({ color: '#f33450' }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        })
      }
    })
    map.addLayer(gpxDataLayer)
    return () => {
      map.removeLayer(gpxDataLayer)
    }
  }, [map, gpxFile])

  return null
}

export default GpxDataLayer

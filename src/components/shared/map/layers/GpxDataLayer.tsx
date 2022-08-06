import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import 'ol-ext/dist/ol-ext.css'
import './styles/gps-image-popup.scss'
import { GpxFileUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import { GPX } from 'ol/format'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { FeatureLike } from 'ol/Feature'

type GpsMarkerLayerProps = {
  gpxFile?: GpxFileUpload,
}

/**
 * Adds a layer which can display data from a gpx file.
 */
const GpxDataLayer = ({ gpxFile }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)
  const style: any = {
    Point: new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: 'rgba(255,255,0,0.4)'
        }),
        radius: 5,
        stroke: new Stroke({
          color: '#ff0',
          width: 1
        })
      })
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: '#f00',
        width: 3
      })
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: '#0f0',
        width: 3
      })
    }),
    LinearRing: null
  }

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
        return style[feature.getGeometry()!.getType()]
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

import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import 'ol-ext/dist/ol-ext.css'
import { GpxFileUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import { GPX } from 'ol/format'
import { Fill, Stroke } from 'ol/style'
import Profile from 'ol-ext/style/Profile'
import createVectorLayer from '../../../../utils/map/create-vector-layer'
import { MapLayers } from '../../../../enums/map-layers'
import { MultiLineString, Point } from 'ol/geom'
import { Feature } from 'ol'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import VectorLayer from 'ol/layer/Vector'

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
    const gpxVectorSource = new VectorSource({
      url: getCloudStorageUrlForIdentifier(gpxFile.identifier),
      format: new GPX()
    })

    const gpxDataLayer = createVectorLayer(MapLayers.GPX)
    gpxDataLayer.setSource(gpxVectorSource)
    gpxDataLayer.setStyle(() => new Profile({
      scale: 4,
      fill: new Fill({ color: [154, 154, 230, 0.8] }),
      stroke: new Stroke({
        color: '#2a2afa',
        width: 4
      })
    }))

    map.addLayer(gpxDataLayer)

    gpxDataLayer.getSource()!.on('addfeature', () => {
      map.getView().fit(gpxDataLayer.getSource()?.getExtent()!, { size: map.getSize(), padding: [100, 100, 100, 100] })
    })

    gpxDataLayer.getSource()!.on('featuresloadend', () => {
      const feature = gpxDataLayer.getSource()?.getFeatures()[0].getGeometry() as MultiLineString

      const vectorLayer = new VectorLayer({
        source: new VectorSource()
      })

      const iconFeatureStart = new Feature({
        geometry: new Point(feature.getFirstCoordinate()),
        name: 'Start'
      })
      iconFeatureStart.setStyle(MapConfigurationService.getStartIcon())

      const iconFeatureEnd = new Feature({
        geometry: new Point(feature.getLastCoordinate()),
        name: 'End'
      })
      iconFeatureEnd.setStyle(MapConfigurationService.getEndIcon())

      vectorLayer.getSource()!.addFeature(iconFeatureStart)
      vectorLayer.getSource()!.addFeature(iconFeatureEnd)

      map.addLayer(vectorLayer)
    })
    return () => {
      map.removeLayer(gpxDataLayer)
    }
  }, [map, gpxFile])

  return null
}

export default GpxDataLayer

import { GeoJsonObject } from 'geojson'
import { Feature } from 'ol'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import VectorLayer from 'ol/layer/Vector'
import { Geometry } from 'ol/geom'
import { GeoJSONPoint } from 'ol/format/GeoJSON'
import { StyleSelector } from '../../types/map'

/**
 * Adds geojson points to an existing vector layer as markers
 */
const addLayerFeatures = (features: GeoJsonObject[], layer: VectorLayer<VectorSource<Geometry>>, styleSelector: StyleSelector): number[] => {
  const jsonFeatures: Feature[] = []
  let extent: number[] = []

  features.forEach((feature: GeoJsonObject, idx: number, objects: GeoJsonObject[]) => {
    if (Object.keys(feature).length !== 0 && (feature as GeoJSONPoint).coordinates.length !== 0) {
      const jsonFeature = new GeoJSON().readFeature(feature, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })

      const style = styleSelector(idx, objects)
      jsonFeature.setId(idx)
      jsonFeature.setStyle(style)
      jsonFeatures.push(jsonFeature)
    }
  })

  if (jsonFeatures.length > 0) {
    layer.getSource()!.addFeatures(jsonFeatures)
  }

  if (jsonFeatures.length > 1) {
    extent = layer.getSource()!.getExtent()
  }

  return extent
}

export default addLayerFeatures

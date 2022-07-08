import { Feature } from 'ol'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import VectorLayer from 'ol/layer/Vector'
import { Geometry } from 'ol/geom'
import { GeoJSONPoint } from 'ol/format/GeoJSON'
import { GeoJsonPropertySetter, GeometryObject, StyleSelector } from '../../types/map'

/**
 * Adds geojson points to an existing vector layer as markers. Takes a StyleSelector callback to style all items and an
 * (optional) GeoJsonPropertySetter to add properties to each feature (for e.g. popups).
 */
const addLayerFeatures = <T extends GeometryObject>(features: T[], layer: VectorLayer<VectorSource<Geometry>>, styleSelector: StyleSelector<T>, propertySetter: GeoJsonPropertySetter<T, any> | null = null): number[] => {
  const jsonFeatures: Feature[] = []
  let extent: number[] = []

  features.forEach((feature: T, idx: number, objects: T[]) => {
    const geometry = feature.getGeometry()
    if (geometry && Object.keys(geometry).length !== 0 && (geometry as GeoJSONPoint).coordinates.length !== 0) {
      const jsonFeature = new GeoJSON().readFeature(geometry, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })

      const style = styleSelector(idx, objects)
      jsonFeature.setStyle(style)

      if (propertySetter) {
        const properties = propertySetter(feature)
        jsonFeature.setProperties(properties)
      }

      jsonFeature.setId(idx)
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

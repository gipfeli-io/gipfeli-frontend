import { Feature } from 'ol'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { Geometry } from 'ol/geom'
import { GeoJSONPoint } from 'ol/format/GeoJSON'
import { GeoJsonPropertySetter, GeometryObject, StyleSelector } from '../../types/map'
import { CoordinateSystems } from '../../enums/coordinate-systems'

/**
 * Adds geojson points to an existing vector source as markers. Takes a StyleSelector callback to style all items and an
 * (optional) GeoJsonPropertySetter to add properties to each feature (for e.g. popups).
 */
const addFeaturesToVectorSource = <T extends GeometryObject>(features: T[], source: VectorSource<Geometry>, styleSelector: StyleSelector<T>, propertySetter: GeoJsonPropertySetter<T, any> | null = null): number[] => {
  const jsonFeatures: Feature[] = []
  let extent: number[] = []

  features.forEach((feature: T, idx: number, objects: T[]) => {
    const geometry = feature.getGeometry()
    if (geometry && Object.keys(geometry).length !== 0 && (geometry as GeoJSONPoint).coordinates.length !== 0) {
      const jsonFeature = new GeoJSON().readFeature(geometry, {
        dataProjection: CoordinateSystems.DATA,
        featureProjection: CoordinateSystems.MAP
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
    source.addFeatures(jsonFeatures)
  }

  if (jsonFeatures.length > 1) {
    extent = source.getExtent()
  }

  return extent
}

export default addFeaturesToVectorSource

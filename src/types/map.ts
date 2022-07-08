import { Extent } from 'ol/extent'
import { Layer } from 'ol/layer'
import { Style } from 'ol/style'
import { GeoJsonObject } from 'geojson'

/**
 * A layer that contains the extent of its feature as well as the layer itself. This can be used to not have to call the
 * layer's getExtent() method within components.
 */
export interface GeoJSONLayer {
    extent: Extent,
    layer: Layer
}

/**
 * Function that is applied to all features in an array and returns a style object for each individual feature. It takes
 * the index of the current element in the array as well as the total array and allows for custom logic in assigning the
 * feature style.
 */
export type StyleSelector<T extends GeometryObject> = (index: number, features: T[]) => Style

/**
 * Function that is applied to a feature and returns an object with key-values pairs that can be set on the feature's
 * GeoJSONFeature representation.
 */
export type GeoJsonPropertySetter<TProp extends GeometryObject, TReturn extends { [key: string]: string}> = (feature: TProp) => TReturn

/**
 * Abstract class which can be used to add a GeoJsonObject to the map. Each class that has a geometry (e.g. a Point or
 * a Line) should extend this class. This allows various helper functions to run properly because they have a unified
 * interface to access any objects geometry.
 */
export abstract class GeometryObject {
  public abstract getGeometry() : GeoJsonObject | null
}

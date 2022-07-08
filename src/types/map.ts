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
 * Function that is applied to all features in a GeoJSONFeature array and returns a style object for each individual
 * feature. It takes the index of the current element in the array as well as the total array and allows for custom
 * logic in assigning the feature style.
 */
export type StyleSelector = (index: number, features: GeoJsonObject[]) => Style

import {Extent} from 'ol/extent'
import {Layer} from 'ol/layer'

/**
 * A layer that contains the extent of its feature as well as the layer itself. This can be used to not have to call the
 * layer's getExtent() method within components.
 */
export interface GeoJSONLayer {
    extent: Extent,
    layer: Layer
}
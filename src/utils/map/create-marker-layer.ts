import {GeoJSON} from 'ol/format'
import {Icon, Style} from 'ol/style'
import {Vector as VectorSource} from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import {GeoJsonObject} from 'geojson'
import {Feature} from 'ol'
import {GeoJSONLayer} from '../../types/map'


const START_ICON = 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1'
const END_ICON = 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1'

/**
 * Creates a GeoJSON layer as VectorLayer with markers.
 *
 * Todo: This should also handle editing, i.e. if no features are passed.
 * Todo: We also will have different types of geometries - can we handle this generically?
 * @param features
 */
export default function createMarkerLayer(features: GeoJsonObject[]): GeoJSONLayer {
    const jsonFeatures: Feature[] = []

    features.forEach((feature, idx, features) => {
        const jsonFeature = new GeoJSON().readFeature(feature)
        const style = new Style({
            image: new Icon(({
                anchor: [0.5, 1],
                src: idx === features.length -1 ? END_ICON : START_ICON
            }))
        })

        jsonFeature.setStyle(style)
        jsonFeatures.push(jsonFeature)
    })

    const vectorSource = new VectorSource()
    vectorSource.addFeatures(jsonFeatures)
    const vectorLayer = new VectorLayer({
        source: vectorSource
    })

    return {extent: vectorSource.getExtent(), layer: vectorLayer}
}

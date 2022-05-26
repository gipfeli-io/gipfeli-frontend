import {GeoJSON} from 'ol/format'
import {Icon, Style} from 'ol/style'
import {Vector as VectorSource} from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import {GeoJsonObject} from 'geojson'
import {Feature} from 'ol'
import {GeoJSONLayer} from '../../types/map'
import MapConfigurationService from "../../services/map/map-configuration-service";

/**
 * Creates a GeoJSON layer as VectorLayer with markers.
 *
 * Todo: This should also handle editing, i.e. if no features are passed.
 * Todo: We also will have different types of geometries - can we handle this generically?
 * @param features
 */
export default function createMarkerLayer(features: GeoJsonObject[]): GeoJSONLayer {
    const jsonFeatures: Feature[] = []
    const vectorSource = new VectorSource()
    let extent: number[] = [];
    const mapConfigurationService: MapConfigurationService = new MapConfigurationService()
    const startIcon = mapConfigurationService.getStartIcon()
    const endIcon = mapConfigurationService.getEndIcon()


    features.forEach((feature, idx, features) => {
        if(Object.keys(feature).length !== 0){
            const jsonFeature = new GeoJSON().readFeature(feature, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
            const style = new Style({
                image: new Icon(({
                    anchor: [0.5, 1],
                    src: idx === features.length -1 ? endIcon : startIcon
                }))
            })

            jsonFeature.setStyle(style)
            jsonFeatures.push(jsonFeature)
        }
    })

    if(jsonFeatures.length > 0){
        vectorSource.addFeatures(jsonFeatures)
        extent = vectorSource.getExtent()
    }

    const vectorLayer = new VectorLayer({
        source: vectorSource
    })

    return {extent: extent, layer: vectorLayer}
}

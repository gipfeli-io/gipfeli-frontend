import {GeoJsonObject} from "geojson";
import {Feature} from "ol";
import {Vector as VectorSource} from "ol/source";
import MapConfigurationService from "../../services/map/map-configuration-service";
import {GeoJSON} from "ol/format";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import {Geometry} from "ol/geom";
import {GeoJSONPoint} from "ol/format/GeoJSON";

/**
 * Adds geojson points to an existing vector layer as markers
 */
export default function addLayerFeatures(features: GeoJsonObject[], layer: VectorLayer<VectorSource<Geometry>>): number[] {
    const jsonFeatures: Feature[] = []
    const mapConfigurationService: MapConfigurationService = new MapConfigurationService()
    const startIcon = mapConfigurationService.getStartIcon()
    const endIcon = mapConfigurationService.getEndIcon()
    let extent: number[] = []

    features.forEach((feature:GeoJsonObject, idx:number, features:GeoJsonObject[]) => {
        if(Object.keys(feature).length !== 0 && (feature as GeoJSONPoint).coordinates.length !== 0){
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
            jsonFeature.setId(idx)
            jsonFeature.setStyle(style)
            jsonFeatures.push(jsonFeature)
        }
    })

    if(jsonFeatures.length > 0){
        layer.getSource()!.addFeatures(jsonFeatures)
    }

    if(jsonFeatures.length > 1){
        extent = layer.getSource()!.getExtent()
    }

    return extent
}
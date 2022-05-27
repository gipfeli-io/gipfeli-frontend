import {useContext, useEffect} from 'react'
import MapContext from '../MapContext'
import createMarkerLayer from '../../../../utils/map/create-marker-layer'
import {Draw, Modify} from "ol/interaction";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from "ol/style";
import {Geometry} from "ol/geom";
import Point from "ol/geom/Point"
import {Point as GeoJsonPoint} from 'geojson'
import {Feature} from "ol";
import MapConfigurationService from "../../../../services/map/map-configuration-service";
import addLayerFeatures from "../../../../utils/map/add-layer-features";
import VectorLayer from "ol/layer/Vector";
import {Layer} from "ol/layer";

interface WayPointMarkerLayerProps {
    /** An array of GeoJSON Points that will be mapped to markers. */
    features: GeoJsonPoint[],
    type?: string,
    handleSetMarker?: (coordinates: number[], id: number) => void
}

/**
 * Adds a geojsonlayer control to a map.
 */
const WayPointMarkerLayer = ({features, type, handleSetMarker}: WayPointMarkerLayerProps) => {
    const {map} = useContext(MapContext)

    useEffect(() => {

        const mapConfigurationService = new MapConfigurationService()
        const maxMarkerCount = mapConfigurationService.getMaxMarkerCount() //this might change in the future?
        const startIcon = mapConfigurationService.getStartIcon()
        const endIcon = mapConfigurationService.getEndIcon()
        let layerExtent;
        let markerLayer: VectorLayer<VectorSource>;

        if (!map || !features) {
            return
        }

        markerLayer = map.getAllLayers().find((layer: Layer) => layer.getProperties()['name'] === 'marker_layer') as VectorLayer<VectorSource>
        if(!markerLayer) {
            const {layer} = createMarkerLayer()
            markerLayer = layer as VectorLayer<VectorSource>
            layerExtent = addLayerFeatures(features, markerLayer as VectorLayer<VectorSource>)
            map.addLayer(markerLayer)
        } else {
            markerLayer.getSource()?.clear(true)
            layerExtent = addLayerFeatures(features, markerLayer as VectorLayer<VectorSource>)
        }

        //if no features were added the extent is set to an empty array
        if(layerExtent!.length !== 0){
            map.getView().fit(layerExtent!, {size: map.getSize(), padding: [100, 100, 100, 100]})
        }

        if(type){
            const source = markerLayer.getSource() as VectorSource
            let markerId = source.getFeatures().length
            const modify = new Modify({source: source})
            map.addInteraction(modify)
            if(type==='Create' && markerId < maxMarkerCount){
                const draw = new Draw({
                    source: markerLayer.getSource() as VectorSource,
                    type: 'Point',
                    style: new Style({
                        image: new Icon(({
                            anchor: [0.5, 1],
                            src: markerId === 0 ? startIcon : endIcon
                        }))
                    })
                })

                map.addInteraction(draw)

                draw.on('drawend', (evt)=> {
                    const selectedFeature: Geometry = evt.feature.getGeometry()!
                    const point: Point = new Feature(selectedFeature.clone().transform('EPSG:3857', 'EPSG:4326')).getGeometry() as Point
                    handleSetMarker!(point.getCoordinates(), markerId)
                    markerId++
                    //remove draw interaction if we reach the max marker count
                    if(markerId >= maxMarkerCount){
                        map.removeInteraction(draw)
                    }
                })
            }
        }
    }, [map, features, handleSetMarker, type])
    return null
}

export default WayPointMarkerLayer
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
        if (!map || !features) {
            return
        }
        console.log('create marker layer', features)
        const {extent, layer} = createMarkerLayer(features)
        map.addLayer(layer)
        //if no features were added the extent is set to an empty array
        if(extent.length !== 0){
            map.getView().fit(extent, {size: map.getSize(), padding: [100, 100, 100, 100]})
        }

        if(type){
            const source = layer.getSource() as VectorSource
            const modify = new Modify({source: source})
            map.addInteraction(modify)
            if(type==='Create'){
                let markerId = 1;
                const draw = new Draw({
                    source: layer.getSource() as VectorSource,
                    type: 'Point',
                    style: new Style({
                        image: new Icon(({
                            anchor: [0.5, 1],
                            src: markerId === 1 ? startIcon : endIcon
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
                    if(markerId > maxMarkerCount){
                        map.removeInteraction(draw)
                    }
                })
            }
        }
    }, [map, features])
    return null
}

export default WayPointMarkerLayer
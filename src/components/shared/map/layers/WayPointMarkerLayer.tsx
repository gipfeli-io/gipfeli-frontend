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
import {DrawEvent} from "ol/interaction/Draw";
import {ModifyEvent} from "ol/interaction/Modify";

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

        // if map or features are not set do nothing
        if (!map || !features) {
            return
        }

        const mapConfigurationService = new MapConfigurationService()
        const maxMarkerCount = mapConfigurationService.getMaxMarkerCount()
        const startIcon = mapConfigurationService.getStartIcon()
        const endIcon = mapConfigurationService.getEndIcon()

        const setupMarkerLayer = (): VectorLayer<VectorSource> => {
            let markerLayer = map!.getAllLayers().find((layer: Layer) => layer.getProperties()['name'] === 'marker_layer') as VectorLayer<VectorSource>
            let layerExtent: number[]

            if(!markerLayer) {
                const {layer} = createMarkerLayer()
                markerLayer = layer as VectorLayer<VectorSource>
                layerExtent = addLayerFeatures(features, markerLayer as VectorLayer<VectorSource>)
                map!.addLayer(markerLayer)
            } else {
                markerLayer.getSource()?.clear(true)
                layerExtent = addLayerFeatures(features, markerLayer as VectorLayer<VectorSource>)
            }

            //if no features were added the extent is set to an empty array
            if(layerExtent!.length !== 0){
                map!.getView().fit(layerExtent!, {size: map!.getSize(), padding: [100, 100, 100, 100]})
            }

            return markerLayer
        }

        const addModifyInteraction = (source: VectorSource): void => {
            const modifyInteraction = new Modify({source: source})
            map!.addInteraction(modifyInteraction)

            initModifyListener(modifyInteraction)
        }

        const setupDrawInteraction = (source: VectorSource, markerId: number): void => {
            const drawInteraction = new Draw({
                source: source,
                type: 'Point',
                style: new Style({
                    image: new Icon(({
                        anchor: [0.5, 1],
                        src: markerId === 0 ? startIcon : endIcon
                    }))
                }),
            })

            map!.addInteraction(drawInteraction)

            initDrawListener(drawInteraction, markerId)
        }

        const initDrawListener = (drawInteraction: Draw, markerId: number): void => {
            drawInteraction.on('drawend', (evt: DrawEvent)=> {
                const selectedFeature: Geometry = evt.feature.getGeometry()!
                const point: Point = new Feature(selectedFeature.clone().transform('EPSG:3857', 'EPSG:4326')).getGeometry() as Point
                handleSetMarker!(point.getCoordinates(), markerId)
                markerId++
                //remove draw interaction if we reach the max marker count
                if(markerId >= maxMarkerCount){
                    map!.removeInteraction(drawInteraction)
                }
            })
        }

        const initModifyListener = (modifyInteraction: Modify): void => {
            modifyInteraction.on('modifyend', (evt: ModifyEvent) => {
                const feature = evt.features.getArray()[0]
                const featureId = feature.getId() as number
                const modifiedFeature: Geometry = feature.getGeometry() as Geometry
                const point: Point = new Feature(modifiedFeature!.clone().transform('EPSG:3857', 'EPSG:4326')).getGeometry() as Point
                handleSetMarker!(point.getCoordinates(), featureId)
            })
        }

        const layer = setupMarkerLayer()
        const source = layer.getSource() as VectorSource

        // only add interactions when type is set (type = 'edit' or 'create')
        if(type){
            let markerId = source.getFeatures().length
            addModifyInteraction(source)
            if(type==='Create' && markerId < maxMarkerCount){
                setupDrawInteraction(source, markerId)
            }
        }
    }, [map, features, handleSetMarker, type])
    return null
}

export default WayPointMarkerLayer
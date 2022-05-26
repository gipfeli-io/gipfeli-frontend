import {useContext, useEffect} from 'react'
import MapContext from '../MapContext'
import {Point} from 'geojson'
import createMarkerLayer from '../../../../utils/map/create-marker-layer'

interface WayPointMarkerLayerProps {
    /** An array of GeoJSON Points that will be mapped to markers. */
    features: Point[]
}

/**
 * Adds a geojsonlayer control to a map.
 */
const WayPointMarkerLayer = ({features}: WayPointMarkerLayerProps) => {
    const {map} = useContext(MapContext)
    useEffect(() => {
        if (!map) {
            return
        }

        const {extent, layer} = createMarkerLayer(features)
        map.addLayer(layer)
        map.getView().fit(extent, {size: map.getSize(), padding: [100, 100, 100, 100]})
    }, [map, features])
    return null
}

export default WayPointMarkerLayer
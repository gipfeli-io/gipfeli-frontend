import React from 'react'
import {Map} from 'ol'

interface MapContext {
    map?: Map
}

/**
 * MapContext wrapper to allow acces to the map object for subcomponents.
 */
const MapContext = React.createContext<MapContext>({})

export default MapContext
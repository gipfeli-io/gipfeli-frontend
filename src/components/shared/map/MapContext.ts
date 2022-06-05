import React from 'react'
import { Map } from 'ol'

interface MapContextProperties {
    map?: Map
}

/**
 * MapContext wrapper to allow access to the map object for subcomponents.
 */
const MapContext = React.createContext<MapContextProperties>({})

export default MapContext

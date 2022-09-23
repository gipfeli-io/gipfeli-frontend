import React from 'react'
import { MapContextType } from '../types/contexts'

/**
 * The context interface (MapContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/MapProvider.tsx, which displays a given map object.
 *
 * We provide the hook src/hooks/use-map, so you can easily re-use the map in your components.
 */
const MapContext = React.createContext<MapContextType>(null!)

export default MapContext

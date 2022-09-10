import React, { PropsWithChildren } from 'react'
import MapContext from '../../contexts/map-context'
import { Map } from 'ol'

type MapProviderProps = {
  map: Map
}

const MapProvider = ({ children, map }: PropsWithChildren<MapProviderProps>) => {
  return (
    <MapContext.Provider value={{ map }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider

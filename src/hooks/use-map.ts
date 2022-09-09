import { useContext } from 'react'
import MapContext from '../contexts/map-context'

const useMap = () => useContext(MapContext)

export default useMap

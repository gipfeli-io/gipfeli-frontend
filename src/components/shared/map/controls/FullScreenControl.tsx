import {useContext, useEffect} from 'react'
import {FullScreen} from 'ol/control'
import MapContext from '../MapContext'

/**
 * Adds a fullscreen control to a map.
 */
const FullScreenControl = () => {
    const {map} = useContext(MapContext)
    useEffect(() => {
        if (!map) {
            return
        }

        let fullScreenControl = new FullScreen({})
        map.addControl(fullScreenControl)
    }, [map])
    return null
}
export default FullScreenControl
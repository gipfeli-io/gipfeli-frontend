import { useEffect } from 'react'
import { FullScreen } from 'ol/control'
import useMap from '../../../../hooks/use-map'

/**
 * Adds a fullscreen control to a map.
 */
const FullScreenControl = () => {
  const { map } = useMap()
  useEffect(() => {
    const fullScreenControl = new FullScreen({})
    map.addControl(fullScreenControl)
  }, [map])
  return null
}

export default FullScreenControl

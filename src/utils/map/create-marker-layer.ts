import { Vector as VectorSource } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import { GeoJSONLayer } from '../../types/map'

/**
 * Creates a GeoJSON layer as VectorLayer
 */
export default function createMarkerLayer (): GeoJSONLayer {
  const vectorSource = new VectorSource()
  const extent: number[] = []

  const vectorLayer = new VectorLayer({
    properties: {
      name: 'marker_layer'
    },
    source: vectorSource
  })

  return { extent, layer: vectorLayer }
}

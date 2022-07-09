import { Vector as VectorSource } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'

/**
 * Creates a GeoJSON layer as VectorLayer which can be used to add GeoJSON features
 */
const createVectorLayer = (layerName: string): VectorLayer<VectorSource> => {
  const vectorSource = new VectorSource()

  return new VectorLayer({
    properties: {
      name: layerName
    },
    source: vectorSource
  })
}

export default createVectorLayer

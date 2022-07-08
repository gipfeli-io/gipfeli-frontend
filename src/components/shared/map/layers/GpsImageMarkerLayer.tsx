import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import createVectorLayer from '../../../../utils/map/create-vector-layer'
import VectorSource from 'ol/source/Vector'
import { Point as GeoJsonPoint } from 'geojson'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import addLayerFeatures from '../../../../utils/map/add-layer-features'
import VectorLayer from 'ol/layer/Vector'
import { Layer } from 'ol/layer'
import { StyleSelector } from '../../../../types/map'
import { Icon, Style } from 'ol/style'
import { MapLayers } from '../../../../enums/map-layers'
import FixedPopup from 'ol-ext/overlay/FixedPopup'
import { Select } from 'ol/interaction'
import 'ol-ext/dist/ol-ext.css'

type GpsMarkerLayerProps = {
  /** An array of GeoJSON Points that will be mapped to markers. */
  features: GeoJsonPoint[],
}

/**
 * Adds a geojsonlayer control to a map.
 */
const GpsMarkerLayer = ({ features }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  const iconSelector: StyleSelector = (index, objects) => {
    return new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: MapConfigurationService.getImageIcon()
      }))
    })
  }

  useEffect(() => {
    // if map or features are not set do nothing
    if (!map || !features) {
      return
    }

    const setupMarkerLayer = (): VectorLayer<VectorSource> => {
      // todo: extract layers as properties
      let imageLayer = map.getAllLayers().find((layer: Layer) => layer.getProperties().name === 'image_layer') as VectorLayer<VectorSource>
      if (!imageLayer) {
        const { layer } = createVectorLayer(MapLayers.IMAGE_MARKER)
        imageLayer = layer as VectorLayer<VectorSource>
        addLayerFeatures(features, imageLayer, iconSelector)
        map.addLayer(imageLayer)
      } else {
        imageLayer.getSource()?.clear(true)
        addLayerFeatures(features, imageLayer, iconSelector)
      }

      return imageLayer
    }

    const setupPopups = (selectableLayer: VectorLayer<VectorSource>) => {
      const popup = new FixedPopup({ popupClass: 'default', closeBox: true })
      map.addOverlay(popup)

      const select = new Select({
        layers: [selectableLayer],
        style: new Style({
          image: new Icon(({
            anchor: [0.5, 1],
            src: MapConfigurationService.getSelectedImageIcon()
          }))
        })
      })
      map.addInteraction(select)

      select.getFeatures().on(['add'], function (e): void {
        // @ts-ignore
        const feature = e.element
        let content = ''
        content += '<img src=\'' + feature.get('img') + '\'/>'
        content += feature.get('text')
        content += '<br/><i>powered by <a href="https://github.com/Viglino/ol-ext" target="ol">ol-ext</a></i>'

        popup.show(feature.getGeometry().getFirstCoordinate(), content)
      })

      select.getFeatures().on(['remove'], function (e) {
        popup.hide()
      })
    }

    const selectableLayer = setupMarkerLayer()
    setupPopups(selectableLayer)
  }, [map, features]
  )
  return null
}

export default GpsMarkerLayer

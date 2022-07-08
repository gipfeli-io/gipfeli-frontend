import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import createVectorLayer from '../../../../utils/map/create-vector-layer'
import VectorSource from 'ol/source/Vector'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import addLayerFeatures from '../../../../utils/map/add-layer-features'
import VectorLayer from 'ol/layer/Vector'
import { Layer } from 'ol/layer'
import { GeoJsonPropertySetter, StyleSelector } from '../../../../types/map'
import { Icon, Style } from 'ol/style'
import { MapLayers } from '../../../../enums/map-layers'
import FixedPopup from 'ol-ext/overlay/FixedPopup'
import { Select } from 'ol/interaction'
import 'ol-ext/dist/ol-ext.css'
import { ImageUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'

type GpsMarkerLayerProps = {
  features: ImageUpload[],
}

type PopupContent = {
  image: string
}

/**
 * Adds a geojsonlayer control to a map.
 */
const GpsMarkerLayer = ({ features }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  const iconSelector: StyleSelector<ImageUpload> = (index, objects) => {
    return new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: MapConfigurationService.getImageIcon()
      }))
    })
  }

  const propertySetter: GeoJsonPropertySetter<ImageUpload, PopupContent> = (feature: ImageUpload) => {
    return {
      image: feature.identifier
    }
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
        addLayerFeatures<ImageUpload>(features, imageLayer, iconSelector, propertySetter)
        map.addLayer(imageLayer)
      } else {
        imageLayer.getSource()?.clear(true)
        addLayerFeatures<ImageUpload>(features, imageLayer, iconSelector, propertySetter)
      }

      return imageLayer
    }

    const setupPopups = (layer: VectorLayer<VectorSource>) => {
      const popup = new FixedPopup({ popupClass: 'default', closeBox: true })
      map.addOverlay(popup)

      const select = new Select({
        layers: [layer],
        style: new Style({
          image: new Icon(({
            anchor: [0.5, 1],
            src: MapConfigurationService.getImageIcon(),
            scale: 1.2
          }))
        })
      })
      map.addInteraction(select)

      select.getFeatures().on(['add'], function (e): void {
        // @ts-ignore
        const feature = e.element
        const imageUrl = getCloudStorageUrlForIdentifier(feature.get('image'))
        let content = ''
        content += '<img src=\'' + imageUrl + '\'/>'
        content += '<br/><i><a href="' + imageUrl + '" target="_blank">Full screen</a></i>'

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

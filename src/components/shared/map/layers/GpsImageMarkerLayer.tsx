import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Layer } from 'ol/layer'
import { GeoJsonPropertySetter, StyleSelector } from '../../../../types/map'
import { Icon, Style } from 'ol/style'
import { MapLayers } from '../../../../enums/map-layers'
import { Select } from 'ol/interaction'
import 'ol-ext/dist/ol-ext.css'
import './styles/gps-image-popup.scss'
import { ImageUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import Popup from 'ol-ext/overlay/Popup'
import BaseEvent from 'ol/events/Event'
import { CollectionEvent } from 'ol/Collection'
import { click, pointerMove } from 'ol/events/condition'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import addLayerFeatures from '../../../../utils/map/add-layer-features'
import createVectorLayer from '../../../../utils/map/create-vector-layer'

type GpsMarkerLayerProps = {
  features: ImageUpload[],
  isEditable: boolean
}

type PopupContent = {
  content: string
}

/**
 * Adds a layer which can display georeferenced images on the map.
 */
const GpsMarkerLayer = ({ features, isEditable }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  const iconSelector: StyleSelector<ImageUpload> = (_index, _objects) => {
    return new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: MapConfigurationService.getImageIcon()
      }))
    })
  }

  const propertySetter: GeoJsonPropertySetter<ImageUpload, PopupContent> = (feature: ImageUpload) => {
    const imageUrl = getCloudStorageUrlForIdentifier(feature.identifier)
    const content = '<a href="' + imageUrl + '" target="_blank"><img alt="Image" src="' + imageUrl + '"/></a>'

    return {
      content
    }
  }

  useEffect(() => {
    // if map or features are not set do nothing
    if (!map || !features) {
      return
    }

    const setupMarkerLayer = (): VectorLayer<VectorSource> => {
      let imageLayer = map
        .getAllLayers()
        .find((layer: Layer) => layer.getProperties().name === MapLayers.IMAGE_MARKER) as VectorLayer<VectorSource>

      if (!imageLayer) {
        const layer = createVectorLayer(MapLayers.IMAGE_MARKER)
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
      const popup = new Popup({
        popupClass: 'default anim',
        positioning: 'auto',
        autoPan: true,
        offset: [0, -40]
      })
      map.addOverlay(popup)

      const select = new Select({
        condition: isEditable ? pointerMove : click,
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

      select.getFeatures().on('add', function (e: BaseEvent | Event): void {
        // Somehow, the typings of OL are wrong. We get a CollectionEvent here, which is neither BaseEvent nor Event...
        const castedEvent = e as CollectionEvent
        const feature = castedEvent.element
        const popupContent = feature.get('content')
        popup.show(feature.getGeometry().getFirstCoordinate(), popupContent)
      })

      select.getFeatures().on('remove', function (_e: BaseEvent | Event) {
        popup.hide()
      })

      return select
    }

    const selectableLayer = setupMarkerLayer()
    const selectListener = setupPopups(selectableLayer)

    return () => {
      // Clean up, because in devmode, the select listener is attached twice, opening 2 popups.
      // todo: maybe we should clean up everything?
      map.removeInteraction(selectListener)
    }
  }, [map, features]
  )
  return null
}

export default GpsMarkerLayer

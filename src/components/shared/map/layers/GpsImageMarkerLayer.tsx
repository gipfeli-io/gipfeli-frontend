import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Layer } from 'ol/layer'
import { GeoJsonPropertySetter, StyleSelector } from '../../../../types/map'
import { Icon, Stroke, Style } from 'ol/style'
import { MapLayers } from '../../../../enums/map-layers'
import 'ol-ext/dist/ol-ext.css'
import './styles/gps-image-popup.scss'
import { ImageUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import Popup from 'ol-ext/overlay/Popup'
import BaseEvent from 'ol/events/Event'
import { CollectionEvent } from 'ol/Collection'
import { click, pointerMove } from 'ol/events/condition'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import Cluster from 'ol/source/Cluster'
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster'
import { GeoJSON } from 'ol/format'
import { CoordinateSystems } from '../../../../enums/coordinate-systems'
import SelectCluster from 'ol-ext/interaction/SelectCluster'

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
const GpsImageMarkerLayer = ({ features, isEditable }: GpsMarkerLayerProps) => {
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
      let clusterSource: Cluster
      let ultimateSource: VectorSource
      if (!imageLayer) {
        ultimateSource = new VectorSource()
        // const layer = createVectorLayer(MapLayers.IMAGE_MARKER)
        clusterSource = new Cluster({
          attributions: 'xxxxx',
          distance: 40,
          source: new VectorSource()
        })
        // Animated cluster layer
        const clusterLayer = new AnimatedCluster({
          source: clusterSource,
          animationDuration: 700,
          style: (features) => {
            return new Style({
              image: new Icon(({
                anchor: [0.5, 1],
                src: (features.get('features').length > 1 ? MapConfigurationService.getMultipleImagesIcon() : MapConfigurationService.getImageIcon()),
                scale: 1.2
              }))
            })
          }
        })
        imageLayer = clusterLayer as VectorLayer<VectorSource>
        // addLayerFeatures<ImageUpload>(features, imageLayer, iconSelector, propertySetter)
        map.addLayer(imageLayer)
      } else {
        imageLayer.getSource()?.clear(true)
        // addLayerFeatures<ImageUpload>(features, imageLayer, iconSelector, propertySetter)
      }

      function addFeatures () {
        const ext = map.getView().calculateExtent(map.getSize())
        const jsonFeatures = []
        features.forEach((feature, index) => {
          jsonFeatures[index] = new GeoJSON().readFeature(feature.getGeometry(), {
            dataProjection: CoordinateSystems.DATA,
            featureProjection: CoordinateSystems.MAP
          })
        })

        clusterSource.getSource().clear()
        console.log('here')
        clusterSource.getSource().addFeatures(jsonFeatures)
        console.log('here')
      }

      addFeatures()

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

      const select = new SelectCluster({
        condition: isEditable ? pointerMove : click,
        layers: [layer],
        pointRadius: 40,
        featureStyle: () => {
          return new Style({
            image: new Icon(({
              anchor: [0.5, 1],
              src: MapConfigurationService.getImageIcon(),
              scale: 0.9
            })),
            stroke: new Stroke({
              color: '#fff',
              width: 2
            })
          })
        },
        style: (feature) => {
          return new Style({
            image: new Icon(({
              anchor: [0.5, 1],
              // override, so only cluster selection features get the added image
              src: feature.get('selectclusterfeature') ? MapConfigurationService.getImageIcon() : MapConfigurationService.getMultipleImagesIcon(),
              scale: 1.2
            }))
          })
        }
      })
      map.addInteraction(select)

      select.getFeatures().on('add', function (e: BaseEvent | Event): void {
        // Somehow, the typings of OL are wrong. We get a CollectionEvent here, which is neither BaseEvent nor Event...
        const castedEvent = e as CollectionEvent
        const features = castedEvent.element.get('features')
        if (features.length === 1) {
          const popupContent = features[0].get('content')
          popup.show(features[0].getGeometry().getFirstCoordinate(), 'popupContent')
        }
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

export default GpsImageMarkerLayer

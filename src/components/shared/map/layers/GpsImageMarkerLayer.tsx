import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { GeoJsonPropertySetter, StyleSelector } from '../../../../types/map'
import 'ol-ext/dist/ol-ext.css'
import './styles/gps-image-popup.scss'
import { ImageUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import Popup from 'ol-ext/overlay/Popup'
import BaseEvent from 'ol/events/Event'
import { CollectionEvent } from 'ol/Collection'
import { click } from 'ol/events/condition'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import Cluster from 'ol/source/Cluster'
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster'
import SelectCluster from 'ol-ext/interaction/SelectCluster'
import addFeaturesToVectorSource from '../../../../utils/map/add-features-to-vector-source'
import { MapLayers } from '../../../../enums/map-layers'

type GpsMarkerLayerProps = {
  features: ImageUpload[],
}

type PopupContent = {
  content: string
}

/**
 * Adds a layer which can display georeferenced images on the map.
 */
const GpsImageMarkerLayer = ({ features }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  const iconSelector: StyleSelector<ImageUpload> = (_index, _objects) => {
    return MapConfigurationService.getBasicGpsImageIcon()
  }

  const propertySetter: GeoJsonPropertySetter<ImageUpload, PopupContent> = (feature: ImageUpload) => {
    const imageUrl = getCloudStorageUrlForIdentifier(feature.identifier)
    const content = '<a href="' + imageUrl + '" target="_blank"><img alt="Image" src="' + imageUrl + '"/></a>'

    return { content }
  }

  useEffect(() => {
    if (!map || !features) {
      return
    }

    const setupClusterLayer = (): VectorLayer<VectorSource> => {
      const featureSource: VectorSource = new VectorSource()
      const clusterSource = new Cluster({
        distance: 40,
        source: featureSource
      })
      const clusterLayer = new AnimatedCluster({
        properties: {
          name: MapLayers.IMAGE_MARKER
        },
        source: clusterSource,
        animationDuration: 700,
        style: MapConfigurationService.getBasicGpsImageIcon
      })
      addFeaturesToVectorSource<ImageUpload>(features, featureSource, iconSelector, propertySetter)
      map.addLayer(clusterLayer)

      return clusterLayer
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
        condition: click,
        layers: [layer],
        pointRadius: 40,
        featureStyle: MapConfigurationService.getGpsImageIconWithinCluster,
        style: MapConfigurationService.getSelectedGpsImageIcon
      })
      map.addInteraction(select)

      select.getFeatures().on('add', function (e: BaseEvent | Event): void {
        // Somehow, the typings of OL are wrong. We get a CollectionEvent here, which is neither BaseEvent nor Event...
        const castedEvent = e as CollectionEvent
        const selectedFeatures = castedEvent.element.get('features')

        // if the current selection has 1 feature, it is an actual feature. Otherwise, it's a cluster.
        if (selectedFeatures.length === 1) {
          const popupContent = selectedFeatures[0].get('content')
          popup.show(selectedFeatures[0].getGeometry().getFirstCoordinate(), popupContent)
        }
      })

      select.getFeatures().on('remove', function (_e: BaseEvent | Event) {
        popup.hide()
      })

      return select
    }

    const selectableLayer = setupClusterLayer()
    const selectListener = setupPopups(selectableLayer)

    return () => {
      // Clean up, because in devmode, the select listener is attached twice, opening 2 popups.
      // todo: maybe we should clean up everything?
      map.removeInteraction(selectListener)
    }
  }, [map, features])

  return null
}

export default GpsImageMarkerLayer

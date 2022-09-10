import { useEffect } from 'react'
import { Draw, Modify } from 'ol/interaction'
import VectorSource from 'ol/source/Vector'
import { Geometry } from 'ol/geom'
import Point from 'ol/geom/Point'
import { Feature } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import { Layer } from 'ol/layer'
import { DrawEvent } from 'ol/interaction/Draw'
import { ModifyEvent } from 'ol/interaction/Modify'
import { MapLayers } from '../../../../enums/map-layers'
import { TourPoint } from '../../../../types/tour'
import { Extent } from 'ol/extent'
import addFeaturesToVectorSource from '../../../../utils/map/add-features-to-vector-source'
import createVectorLayer from '../../../../utils/map/create-vector-layer'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import { CoordinateSystems } from '../../../../enums/coordinate-systems'
import { FormType } from '../../../../enums/form-type'
import useMap from '../../../../hooks/use-map'

type WayPointMarkerLayerProps = {
  features: TourPoint[],
  type?: FormType,
  handleSetMarker?: (coordinates: number[], id: number) => void
}

/**
 * Adds a layer to the map that contains waypoints which are editable.
 */
const WayPointMarkerLayer = ({ features, type, handleSetMarker }: WayPointMarkerLayerProps) => {
  const { map } = useMap()
  const maxMarkerCount = MapConfigurationService.getMaxMarkerCount()

  const fitToExtent = (layerExtent: Extent) => {
    // check if layer extent is set (if no features were added layer extent is empty array or contains infinite values)
    if (layerExtent.length !== 0 && layerExtent.filter((value: number) => isFinite(value)).length !== 0) {
      map.getView().fit(layerExtent, { size: map.getSize(), padding: [100, 100, 100, 100] })
    }
  }

  const setupMarkerLayer = (): VectorLayer<VectorSource> => {
    let markerLayer = map.getAllLayers().find((layer: Layer) => layer.getProperties().name === MapLayers.WAYPOINT_MARKER) as VectorLayer<VectorSource>
    let layerExtent: Extent
    if (!markerLayer) {
      markerLayer = createVectorLayer(MapLayers.WAYPOINT_MARKER)
      layerExtent = addFeaturesToVectorSource<TourPoint>(features, markerLayer.getSource()!, MapConfigurationService.iconSelector)
      map.addLayer(markerLayer)
    } else {
      markerLayer.getSource()?.clear(true)
      layerExtent = addFeaturesToVectorSource<TourPoint>(features, markerLayer.getSource()!, MapConfigurationService.iconSelector)
    }

    fitToExtent(layerExtent)

    return markerLayer
  }

  const initDrawListener = (drawInteraction: Draw, markerId: number): void => {
    drawInteraction.on('drawend', (evt: DrawEvent) => {
      const selectedFeature: Geometry = evt.feature.getGeometry()!
      const point: Point = new Feature(selectedFeature.clone().transform(CoordinateSystems.MAP, CoordinateSystems.DATA)).getGeometry() as Point
      handleSetMarker!(point.getCoordinates(), markerId)
      markerId++
      // remove draw interaction if we reach the max marker count
      if (markerId >= maxMarkerCount) {
        map.removeInteraction(drawInteraction)
      }
    })
  }

  const initModifyListener = (modifyInteraction: Modify): void => {
    modifyInteraction.on('modifyend', (evt: ModifyEvent) => {
      const feature = evt.features.getArray()[0]
      const featureId = feature.getId() as number
      const modifiedFeature: Geometry = feature.getGeometry() as Geometry
      const point: Point = new Feature(modifiedFeature.clone().transform(CoordinateSystems.MAP, CoordinateSystems.DATA)).getGeometry() as Point
      handleSetMarker!(point.getCoordinates(), featureId)
    })
  }

  const addModifyInteraction = (vectorSource: VectorSource): Modify => {
    const modifyInteraction = new Modify({ source: vectorSource })
    map.addInteraction(modifyInteraction)

    initModifyListener(modifyInteraction)

    return modifyInteraction
  }

  const setupDrawInteraction = (vectorSource: VectorSource, markerId: number): Draw => {
    const drawInteraction = new Draw({
      source: vectorSource,
      type: 'Point',
      style: markerId === 0 ? MapConfigurationService.getStartIcon() : MapConfigurationService.getEndIcon()
    })

    map.addInteraction(drawInteraction)

    initDrawListener(drawInteraction, markerId)

    return drawInteraction
  }

  useEffect(() => {
    // features are not set do nothing
    if (!features) {
      return
    }

    const markerLayer = setupMarkerLayer()
    const source = markerLayer.getSource() as VectorSource
    let drawInteraction: Draw
    let modifyInteraction: Modify
    // only add interactions when type is set (type = 'edit' or 'create')
    if (type) {
      const markerId = source.getFeatures().length
      modifyInteraction = addModifyInteraction(source)
      if (markerId < maxMarkerCount) {
        drawInteraction = setupDrawInteraction(source, markerId)
      }
    }

    return () => {
      map.removeLayer(markerLayer)
      map.removeInteraction(drawInteraction)
      map.removeInteraction(modifyInteraction)
    }
  }, [map, features, handleSetMarker, type])
  return null
}

export default WayPointMarkerLayer

import { useContext, useEffect } from 'react'
import MapContext from '../MapContext'
import VectorSource from 'ol/source/Vector'
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.css'
import { GpxFileUpload } from '../../../../types/media'
import getCloudStorageUrlForIdentifier from '../../../../utils/storage-helper'
import { GPX } from 'ol/format'
import createVectorLayer from '../../../../utils/map/create-vector-layer'
import { MapLayers } from '../../../../enums/map-layers'
import { Geometry, MultiLineString } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import { TourPoint } from '../../../../types/tour'
import Point from 'ol/geom/Point'
import { Feature } from 'ol'
import { CoordinateSystems } from '../../../../enums/coordinate-systems'
import {
  addHoverInteraction,
  addProfileControl, addSelectionInteraction, drawPoint,
  setProfil,
  setProfilPointOnLayer
} from '../../../../utils/map/profil-control-helper'
import Profil from 'ol-ext/control/Profile'
import addFeaturesToVectorSource from '../../../../utils/map/add-features-to-vector-source'
import MapConfigurationService from '../../../../services/map/map-configuration-service'
import { Stroke, Style } from 'ol/style'
import { FeatureLike } from 'ol/Feature'
import Profile from 'ol-ext/style/Profile'

type GpsMarkerLayerProps = {
  gpxFile?: GpxFileUpload,
  handleSetMarker?: (coordinates: number[], id: number) => void
}

/**
 * Adds a layer which can display data from a gpx file.
 */
const GpxDataLayer = ({ gpxFile, handleSetMarker }: GpsMarkerLayerProps) => {
  const { map } = useContext(MapContext)

  const setGpxDataLayerStyle = (gpxDataLayer: VectorLayer<VectorSource>): void => {
    gpxDataLayer.setStyle((feature: FeatureLike) => {
      const multiLineStringStyle =
        new Style({
          stroke: feature.get('select')
            ? new Stroke({
              color: 'red',
              width: 4
            })
            : new Stroke({
              color: '#0f0',
              width: 3
            })
        })
      const profileStyle = new Profile({
        scale: 0.8
      })

      return [profileStyle, multiLineStringStyle]
    })
  }

  const addGpxDataLayer = (): VectorLayer<VectorSource> => {
    const gpxDataLayer = createVectorLayer(MapLayers.GPX)
    const gpxVectorSource = new VectorSource({
      url: getCloudStorageUrlForIdentifier(gpxFile!.identifier),
      format: new GPX()
    })
    gpxDataLayer.setSource(gpxVectorSource)
    setGpxDataLayerStyle(gpxDataLayer)
    map!.addLayer(gpxDataLayer)
    return gpxDataLayer
  }

  const setExtent = (gpxDataLayer: VectorLayer<VectorSource>) => {
      map!.getView().fit(gpxDataLayer.getSource()?.getExtent()!, { size: map!.getSize(), padding: [100, 100, 100, 100] })
  }

  const extractStartAndDestination = (gpxDataLayer: VectorLayer<VectorSource>): {start: TourPoint, destination: TourPoint} => {
    const gpxGeometry = gpxDataLayer.getSource()?.getFeatures()[0].getGeometry() as MultiLineString
    const gpxPoint: Point = new Feature(gpxGeometry.clone().transform(CoordinateSystems.MAP, CoordinateSystems.DATA)).getGeometry() as Point
    return {
      start: new TourPoint({
        type: 'Point',
        coordinates: [gpxPoint.getFirstCoordinate()[0], gpxPoint.getFirstCoordinate()[1]]
      }),
      destination: new TourPoint({
        type: 'Point',
        coordinates: [gpxPoint.getLastCoordinate()[0], gpxPoint.getLastCoordinate()[1]]
      })
    }
  }

  const addMarkerLayer = (): VectorLayer<VectorSource> => {
    const vectorLayer = createVectorLayer(MapLayers.GPX_MARKER)
    map!.addLayer(vectorLayer)
    return vectorLayer
  }

  const updatePointInTour = (markerLayer: VectorLayer<VectorSource>): void => {
    const features = markerLayer.getSource()?.getFeatures()
    features?.forEach((feature: Feature) => {
      const modifiedFeature: Geometry = feature.getGeometry() as Geometry
      const point: Point = new Feature(modifiedFeature.clone().transform(CoordinateSystems.MAP, CoordinateSystems.DATA)).getGeometry() as Point
      if (handleSetMarker) {
        handleSetMarker(point.getCoordinates(), feature.getId()! as number)
      }
    })
  }

  const initSetMarkersHandler = (profileControl: Profil, markerLayer: VectorLayer<VectorSource>, gpxDataLayer: VectorLayer<VectorSource>): void => {
    gpxDataLayer.getSource()!.on('featuresloadend', () => {
      setExtent(gpxDataLayer)
      const { start, destination } = extractStartAndDestination(gpxDataLayer)
      addFeaturesToVectorSource<TourPoint>([start, destination], markerLayer.getSource()!, MapConfigurationService.iconSelector)
      updatePointInTour(markerLayer)
      setProfil(profileControl, gpxDataLayer)
      const profilePoint = setProfilPointOnLayer(gpxDataLayer)
      // @ts-ignore
      profileControl.on(['over', 'out'], (event:any) => { // todo: find out what type of event it is
        drawPoint(profilePoint, event)
      })
      addHoverInteraction(map!, gpxDataLayer, profileControl, profilePoint)
      addSelectionInteraction(profileControl, gpxDataLayer)
    })
  }

  useEffect(() => {
    if (!map || !gpxFile) {
      return
    }

    const gpxDataLayer = addGpxDataLayer()
    const markerLayer = addMarkerLayer()
    const profileControl = addProfileControl(map)

    initSetMarkersHandler(profileControl, markerLayer, gpxDataLayer)

    return () => {
      map.removeLayer(markerLayer)
      map.removeLayer(gpxDataLayer)
      map.removeControl(profileControl)
      if (handleSetMarker) {
        handleSetMarker([], 0)
        handleSetMarker([], 1)
      }
    }
  }, [map, gpxFile])

  return null
}

export default GpxDataLayer

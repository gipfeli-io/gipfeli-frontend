import Profil from 'ol-ext/control/Profile'
import { Fill, Stroke, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { CoordinateSystems } from '../../enums/coordinate-systems'
import { Feature, Map, MapBrowserEvent } from 'ol'
import Hover, { HoverEvent } from 'ol-ext/interaction/Hover'
import { Geometry, Point } from 'ol/geom'
import { Coordinate } from 'ol/coordinate'
import { GeoJSON } from 'ol/format'
import { TourPoint } from '../../types/tour'
import CircleStyle from 'ol/style/Circle'

type HoverInteraction = {
  type: string,
  coord: Coordinate | undefined
}

export const addProfileControl = (map: Map): Profil => {
  const profile = new Profil({
    className: 'ol-profil',
    title: 'Profile',
    style: new Style({
      fill: new Fill({ color: '#ccc' })
    }),
    width: 400,
    height: 200
  })
  map.addControl(profile)
  return profile
}

const style = [
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: 'red' })
    }),
    stroke: new Stroke({
      color: [255, 0, 0],
      width: 2
    })
  })
]

export const drawPoint = (point?: Feature<Geometry>, hoverInteraction?: HoverInteraction) => {
  if (!point) {
    return
  }

  if (hoverInteraction?.type === 'over' && hoverInteraction.coord) {
    // Show point at coord
    point.setGeometry(new Point(hoverInteraction.coord))
    point.setStyle(style)
  } else {
    // hide point
    point.setStyle([])
  }
}

export const setProfile = (profileControl: Profil, gpxDataLayer: VectorLayer<VectorSource>): void => {
  const source = gpxDataLayer.getSource()!
  const feature = source.getFeatures()[0]
  profileControl.setGeometry(feature, {
    graduation: 250,
    amplitude: 1000,
    zmin: 0,
    projection: CoordinateSystems.MAP
  })
}

export const setProfilePointOnLayer = (gpxDataLayer: VectorLayer<VectorSource>): Feature<Geometry> => {
  const initPoint = new TourPoint({
    type: 'Point',
    coordinates: [0, 0]
  })

  const jsonFeature = new GeoJSON().readFeature(initPoint.getGeometry(), {
    dataProjection: CoordinateSystems.DATA,
    featureProjection: CoordinateSystems.MAP
  })
  jsonFeature.setStyle()
  jsonFeature.setId('profile_point')
  gpxDataLayer.getSource()!.addFeature(jsonFeature)
  return jsonFeature
}

export const addHoverInteraction = (map: Map, dataLayer: VectorLayer<VectorSource>, profile: Profil, point: Feature<Geometry>): Hover => {
  const hover = new Hover({
    cursor: 'pointer',
    hitTolerance: 10,
    handleEvent (_p0: MapBrowserEvent<UIEvent>): boolean {
      return true
    }
  })
  map.addInteraction(hover)

  hover.on('hover', (event: HoverEvent) => {
    const feature = dataLayer.getSource()?.getFeatures()[0]
    const pointOnLine = feature?.getGeometry()?.getClosestPoint(event.coordinate)
    drawPoint(point, { type: 'over', coord: pointOnLine })
    profile.showAt(event.coordinate)
  })

  hover.on('leave', () => {
    profile.showAt([])
    drawPoint(point)
  })
  return hover
}

export const addProfileControlInteraction = (profile: Profil, profilePoint: Feature<Geometry>) => {
  // @ts-ignore
  profile.on(['over', 'out'], (event: HoverInteraction) => {
    drawPoint(profilePoint, event)
  })
}

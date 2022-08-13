import Profil from 'ol-ext/control/Profile'
import { Fill, Style } from 'ol/style'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { CoordinateSystems } from '../../enums/coordinate-systems'
import { Feature, Map, MapBrowserEvent } from 'ol'
import Hover, { HoverEvent } from 'ol-ext/interaction/Hover'
import { Point } from 'ol/geom'
import { Coordinate } from 'ol/coordinate'

type HoverInteraction = {
  type: string,
  coordinates: Coordinate | undefined
}

export const addProfileControl = (map: Map): Profil => {
  const profile = new Profil({
    target: document.querySelector('.map-profile') as string | HTMLElement | undefined, // fuck is this ugly. is there a better way?
    className: 'ol-profil',
    title: 'Profile',
    selectable: true,
    style: new Style({
      fill: new Fill({ color: '#ccc' })
    }),
    width: 600,
    height: 300
  })
  map.addControl(profile)
  return profile
}

export const setProfil = (profileControl: Profil, gpxDataLayer: VectorLayer<VectorSource>): void => {
  const source = gpxDataLayer.getSource()!
  const feature = source.getFeatures()[0]
  profileControl.setGeometry(feature, {
    graduation: 250,
    amplitude: 1000,
    zmin: 0,
    projection: CoordinateSystems.MAP
  })
}

const drawPoint = (point?: Feature, hoverInteraction?: HoverInteraction) => {
  if (!point) {
    return
  }

  if (hoverInteraction?.type === 'over') {
    // Show point at coord
    point.setGeometry(new Point(hoverInteraction.coordinates!))
    point.setStyle([])
  } else {
    // hide point
    point.setStyle([])
  }
}

export const addHoverInteraction = (map: Map, gpxDataLayer: VectorLayer<VectorSource>, profil: Profil, point: Feature): Hover => {
  const hover = new Hover({
    cursor: 'pointer',
    hitTolerance: 10,
    handleEvent (_p0: MapBrowserEvent<UIEvent>): boolean {
      return false
    }
  })
  map.addInteraction(hover)

  hover.on('hover', (event: HoverEvent) => {
    const feature = gpxDataLayer.getSource()?.getFeatures()[0]
    const pointOnLine = feature?.getGeometry()?.getClosestPoint(event.coordinate)
    drawPoint(point, { type: 'over', coordinates: pointOnLine })
    profil.showAt(event.coordinate)
  })

  hover.on('leave', () => {
    profil.showAt([])
    drawPoint()
  })
  return hover
}

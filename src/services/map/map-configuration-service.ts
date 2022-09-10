import pinImage from '../../static/img/map/pin_image.png' // Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1&background=03cafc
import pinEndOfTour from '../../static/img/map/pin_end_of_tour.png' // Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1
import pinStartOfTour from '../../static/img/map/pin_start_of_tour.png' // Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1
import pinMultiple from '../../static/img/map/pin_cluster.png' // Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1&background=03cafc
import pinDefault from '../../static/img/map/pin_default.png' // Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-globe&size=50&hoffset=0&voffset=-1
import { FeatureLike } from 'ol/Feature'
import { Icon, Stroke, Style } from 'ol/style'
import { MarkerSize } from '../../enums/marker-size'
import { TourPoint } from '../../types/tour'
import { ViewOptions } from 'ol/View'
import { CoordinateSystems } from '../../enums/coordinate-systems'

enum StyleCache {
  WAYPOINT_START,
  WAYPOINT_END,
  BASIC_IMAGE,
  BASIC_CLUSTER,
  IMAGE_WITHIN_CLUSTER,
  SELECTED_IMAGE,
  SELECTED_CLUSTER
}

/**
 * A factory that takes a string which is a path to an icon and a size and returns a Style.
 */
type StyleFactory = (iconSrc: string, size: number) => Style

export default class MapConfigurationService {
  /**
   * Cache styles, so they do not have to be initiated for each feature. This is useful because the cluster images are
   * re-rendered on every zoom-in, so caching them is much more performant.
   * @private
   */
  private static styleCache: Map<StyleCache, Style> = new Map()

  /**
   * Basic configuration for the map view, defining initial extent, zoom levels, etc.
   */
  public static getMapViewOptions (): ViewOptions {
    return {
      projection: CoordinateSystems.MAP,
      center: [916355.758968, 5909242.750142],
      zoom: 8,
      minZoom: 5,
      maxZoom: 18
    }
  }

  public static iconSelector (index: number, tourPoints: TourPoint[]) : Style {
    return index === tourPoints.length - 1 ? MapConfigurationService.getEndIcon() : MapConfigurationService.getStartIcon()
  }

  /**
   * Icon used to designate the start point of a tour.
   */
  public static getStartIcon (): Style {
    const styleFactory: StyleFactory = () => {
      return new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          src: pinStartOfTour
        }))
      })
    }

    return MapConfigurationService.getOrSetStyleCache(StyleCache.WAYPOINT_START, styleFactory)
  }

  /**
   * Icon used to designate the end point of a tour.
   */
  public static getEndIcon (): Style {
    const styleFactory: StyleFactory = () => {
      return new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          src: pinEndOfTour
        }))
      })
    }

    return MapConfigurationService.getOrSetStyleCache(StyleCache.WAYPOINT_END, styleFactory)
  }

  /**
   * Defines the maximum number of markers which can be added manually.
   */
  public static getMaxMarkerCount (): number {
    return 2
  }

  /**
   * Returns the style for a marker on the image layer. If the given feature contains more than one feature, it means
   * that we have a clustered marker, so we return a different icon (see comment below on getSelectedGpsImageIcon).
   *
   * If no feature is given, it just returns the basic image picture (meaning it's no cluster).
   *
   * @param clusterFeatures
   */
  public static getBasicGpsImageIcon (clusterFeatures?: FeatureLike): Style {
    const isCluster = clusterFeatures === undefined
      ? false
      : clusterFeatures.get('features').length > 1

    const [iconType, iconSrc] = isCluster
      ? [StyleCache.BASIC_CLUSTER, pinMultiple]
      : [StyleCache.BASIC_IMAGE, pinImage]

    const styleFactory: StyleFactory = (icon) => {
      return new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          src: icon,
          scale: MarkerSize.DEFAULT
        }))
      })
    }

    return MapConfigurationService.getOrSetStyleCache(iconType, styleFactory, iconSrc)
  }

  /**
   * Returns the style for a marker that is within a clustered representation. Also sets the stroke so we get a web of
   * clustered icons.
   */
  public static getGpsImageIconWithinCluster (): Style {
    const styleFactory: StyleFactory = () => {
      return new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          src: pinImage,
          scale: MarkerSize.CLUSTERED
        })),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }

    return MapConfigurationService.getOrSetStyleCache(StyleCache.IMAGE_WITHIN_CLUSTER, styleFactory)
  }

  /**
   * Returns the style for a marker that is selected. Because per default, the clustermarker is selectable as well, we
   * need to check for the length of the features property, which is >1 if we have a cluster. This is somewhat ugly, but
   * also how it is done in the library (although not properly documented :)).
   *
   * See https://github.com/Viglino/ol-ext/blob/master/src/interaction/SelectCluster.js#L154
   *
   * @param feature
   */
  public static getSelectedGpsImageIcon (feature: FeatureLike): Style {
    const isCluster = feature.get('features').length > 1
    const [iconType, iconSrc, iconSize] = isCluster
      ? [StyleCache.SELECTED_CLUSTER, pinMultiple, MarkerSize.DEFAULT]
      : [StyleCache.SELECTED_IMAGE, pinImage, MarkerSize.SELECTED]

    const styleFactory: StyleFactory = (icon, size) => {
      return new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          src: icon,
          scale: size
        }))
      })
    }

    return MapConfigurationService.getOrSetStyleCache(iconType, styleFactory, iconSrc, iconSize)
  }

  /**
   * Get from or set a style in the cache. The given styleFactory is called with iconSrc and iconSize which can be used
   * in the style function to dynamically set the icon or the size. Defaults to pinDefault and iconSize if not passed
   * when calling this function, but referenced within the styleFactory.
   * @param iconType
   * @param styleFactory
   * @param iconSrc
   * @param iconSize
   * @private
   */
  private static getOrSetStyleCache (iconType: StyleCache, styleFactory: StyleFactory, iconSrc: string = pinDefault, iconSize: number = MarkerSize.DEFAULT) {
    const cachedIcon = MapConfigurationService.styleCache.get(iconType)
    if (cachedIcon) {
      return cachedIcon
    }

    const style = styleFactory(iconSrc, iconSize)
    MapConfigurationService.styleCache.set(iconType, style)
    return style
  }
}

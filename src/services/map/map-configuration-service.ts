import pinImage from '../../static/img/map/pin_image.png'
import pinEndOfTour from '../../static/img/map/pin_end_of_tour.png'
import pinStartOfTour from '../../static/img/map/pin_start_of_tour.png'
import pinMultiple from '../../static/img/map/pin_cluster.png'
import { FeatureLike } from 'ol/Feature'
import { Icon, Stroke, Style } from 'ol/style'

enum StyleCache {
  WAYPOINT_START,
  WAYPOINT_END,
  BASIC_IMAGE,
  BASIC_CLUSTER,
  IMAGE_WITHIN_CLUSTER,
  SELECTED_IMAGE,
  SELECTED_CLUSTER
}

enum MarkerSize {
  DEFAULT = 1.0,
  SELECTED = 1.2,
  CLUSTERED = 0.9
}

export default class MapConfigurationService {
  /**
   * Cache styles, so they do not have to be initiated for each feature. This is useful because the cluster images are
   * rerendered on every zoom-in, so caching them is much more performant.
   * @private
   */
  private static styleCache: Map<StyleCache, Style> = new Map()

  /**
   * Icon used to designate the start point of a tour.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1
   */
  public static getStartIcon (): Style {
    const cachedIcon = MapConfigurationService.getCachedStyle(StyleCache.WAYPOINT_START)
    if (cachedIcon) {
      return cachedIcon
    }

    const style = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: pinStartOfTour
      }))
    })

    return MapConfigurationService.setAndGetCachedStyle(StyleCache.WAYPOINT_START, style)
  }

  /**
   * Icon used to designate the end point of a tour.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1
   */
  public static getEndIcon (): Style {
    const cachedIcon = MapConfigurationService.getCachedStyle(StyleCache.WAYPOINT_END)
    if (cachedIcon) {
      return cachedIcon
    }

    const style = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: pinEndOfTour
      }))
    })

    return MapConfigurationService.setAndGetCachedStyle(StyleCache.WAYPOINT_START, style)
  }

  /**
   * Icon used for images with GPS coordinates.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1&background=03cafc
   */
  public static getImageIcon (): string {
    return pinImage
  }

  /**
   * Defines the maximum number of markers which can be added manually.
   */
  public static getMaxMarkerCount (): number {
    return 2
  }

  /**
   * Returns the style for a marker on the image layer. If the given feature contains more than one feature, it means
   * that we have a clustered marker, so we return a different icon (see comment below on getSelectedGpsImageIcon)
   * @param clusterFeatures
   */
  public static getBasicGpsImageIcon (clusterFeatures: FeatureLike): Style {
    const isCluster = clusterFeatures.get('features').length > 1
    const iconType = isCluster
      ? StyleCache.BASIC_CLUSTER
      : StyleCache.BASIC_IMAGE

    const cachedIcon = MapConfigurationService.getCachedStyle(iconType)
    if (cachedIcon) {
      return cachedIcon
    }

    const imgSrc = isCluster
      ? MapConfigurationService.getClusterIcon()
      : MapConfigurationService.getImageIcon()
    const style = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: imgSrc,
        scale: MarkerSize.DEFAULT
      }))
    })

    return MapConfigurationService.setAndGetCachedStyle(iconType, style)
  }

  /**
   * Returns the style for a marker that is within a clustered representation. Also sets the stroke so we get a web of
   * clustered icons.
   */
  public static getGpsImageIconWithinCluster (): Style {
    const cachedIcon = MapConfigurationService.getCachedStyle(StyleCache.IMAGE_WITHIN_CLUSTER)
    if (cachedIcon) {
      return cachedIcon
    }

    const style = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: MapConfigurationService.getImageIcon(),
        scale: MarkerSize.CLUSTERED
      })),
      stroke: new Stroke({
        color: '#fff',
        width: 2
      })
    })

    return MapConfigurationService.setAndGetCachedStyle(StyleCache.IMAGE_WITHIN_CLUSTER, style)
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
    const iconType = isCluster
      ? StyleCache.SELECTED_CLUSTER
      : StyleCache.SELECTED_IMAGE

    const cachedIcon = MapConfigurationService.getCachedStyle(iconType)
    if (cachedIcon) {
      return cachedIcon
    }

    const iconSrc = isCluster
      ? MapConfigurationService.getClusterIcon()
      : MapConfigurationService.getImageIcon()

    const style = new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: iconSrc,
        scale: isCluster ? MarkerSize.DEFAULT : MarkerSize.SELECTED
      }))
    })

    return MapConfigurationService.setAndGetCachedStyle(iconType, style)
  }

  /**
   * Icon used for cluster of pins.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1&background=03cafc
   */
  private static getClusterIcon (): string {
    return pinMultiple
  }

  /**
   * Returns a cached Style object or undefined if it is not yet added to cache.
   * @param iconType
   * @private
   */
  private static getCachedStyle (iconType: StyleCache): Style | undefined {
    return this.styleCache.get(iconType)
  }

  /**
   * Caches a Style and returns it.
   * @param iconType
   * @private
   */
  private static setAndGetCachedStyle (iconType: StyleCache, style: Style): Style {
    this.styleCache.set(iconType, style)
    return style
  }
}

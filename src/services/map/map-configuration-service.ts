import pinImage from '../../static/img/map/pin_image.png'
import pinEndOfTour from '../../static/img/map/pin_end_of_tour.png'
import pinStartOfTour from '../../static/img/map/pin_start_of_tour.png'
import pinMultiple from '../../static/img/map/pin_cluster.png'
import { FeatureLike } from 'ol/Feature'
import { Icon, Stroke, Style } from 'ol/style'

export default class MapConfigurationService {
  /**
   * Icon used to designate the start point of a tour.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1
   */
  public static getStartIcon (): string {
    return pinStartOfTour
  }

  /**
   * Icon used to designate the end point of a tour.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1
   */
  public static getEndIcon (): string {
    return pinEndOfTour
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
   * that we have a clustered marker, so we return a different icon.
   * @param clusterFeatures
   */
  public static getBasicGpsImageIcon (clusterFeatures: FeatureLike): Style {
    const imgSrc = clusterFeatures.get('features').length > 1
      ? MapConfigurationService.getClusterIcon()
      : MapConfigurationService.getImageIcon()

    return new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: imgSrc,
        scale: 1.2
      }))
    })
  }

  /**
   * Returns the style for a marker that is within a clustered representation. Also sets the stroke so we get a web of
   * clustered icons.
   */
  public static getGpsImageIconWithinCluster (): Style {
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
  }

  /**
   * Returns the style for a marker that is selected. Because per default, the clustermarker is selected as well, we
   * need to check for the 'selectclusterfeature' property which is only active on actual features, but not the cluster
   * itself.
   * @param feature
   */
  public static getSelectedGpsImageIcon (feature: FeatureLike): Style {
    const iconSrc = feature.get('selectclusterfeature')
      ? MapConfigurationService.getImageIcon()
      : MapConfigurationService.getClusterIcon()

    return new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        src: iconSrc,
        scale: 1.2
      }))
    })
  }

  /**
   * Icon used for cluster of pins.
   * Source: https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1&background=03cafc
   */
  private static getClusterIcon (): string {
    return pinMultiple
  }
}

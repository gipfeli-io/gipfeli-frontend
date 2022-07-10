import pinImage from '../../static/img/map/pin_image.png'
import pinEndOfTour from '../../static/img/map/pin_end_of_tour.png'
import pinStartOfTour from '../../static/img/map/pin_start_of_tour.png'

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

  public static getMaxMarkerCount (): number {
    return 2
  }
}

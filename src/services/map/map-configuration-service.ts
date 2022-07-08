export default class MapConfigurationService {
  public static getStartIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1'
  }

  public static getEndIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1'
  }

  public static getImageIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=50&hoffset=0&voffset=-1'
  }

  public static getSelectedImageIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-camera&size=60&hoffset=0&voffset=-1'
  }

  public static getMaxMarkerCount (): number {
    return 2
  }
}

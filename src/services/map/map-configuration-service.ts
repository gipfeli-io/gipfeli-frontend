export default class MapConfigurationService {
  public getStartIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-play&size=50&hoffset=0&voffset=-1'
  }

  public getEndIcon (): string {
    return 'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-flag-checkered&size=50&hoffset=0&voffset=-1'
  }

  public getMaxMarkerCount (): number {
    return 2
  }
}

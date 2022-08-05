import { GeoJsonObject, Point } from 'geojson'
import { Exclude, Expose, Type } from 'class-transformer'
import { GpxFileUpload, ImageUpload } from './media'
import { TourStatusType } from '../enums/tour-status-type'
import { GeometryObject } from './map'

export class BaseTour {
  @Expose()
    name: string

  @Expose()
    startLocation: Point

  @Expose()
    endLocation: Point

  @Expose()
    description: string

  @Expose()
  @Type(() => ImageUpload)
    images: ImageUpload[]

  @Expose()
  @Type(() => GpxFileUpload)
    gpxFile?: GpxFileUpload

  @Expose()
    userId: string

  /**
   * This is a frontend property only and is not saved/fetched to/from the database
   * It is helps us finding out which entries were mutated while offline and
   * sync them respectively.
   */
  @Exclude()
    status: TourStatusType = TourStatusType.SYNCED

  constructor (name: string, startLocation: Point, endLocation: Point,
    description: string, userId: string, images: ImageUpload[] = [],
    gpxFile?: GpxFileUpload) {
    this.name = name
    this.startLocation = startLocation
    this.endLocation = endLocation
    this.description = description
    this.userId = userId
    this.images = images
    this.gpxFile = gpxFile
  }
}

export class Tour extends BaseTour {
  @Expose()
    id: string

  @Type(() => Date)
    createdAt: Date

  @Type(() => Date)
    updatedAt: Date

  constructor (id: string, name: string, startLocation: Point, endLocation: Point,
    description: string, userId: string, createdAt: Date, updatedAt: Date) {
    super(name, startLocation, endLocation, description, userId)
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

// todo: switch to baseTour
export type UpdateOrCreateTour = Pick<Tour, 'name' | 'description' | 'startLocation' | 'endLocation' | 'images'>

/**
 * A generic tourpoint which extends from GeometryObject and can be added to the map.
 */
export class TourPoint extends GeometryObject {
  private readonly location: Point

  constructor (location: Point) {
    super()
    this.location = location
  }

  getGeometry (): GeoJsonObject | null {
    return this.location
  }
}

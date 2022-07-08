import { Point } from 'geojson'
import { Exclude, Expose, Type } from 'class-transformer'
import { ImageUpload } from './media'

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
    images: ImageUpload[]

  /**
   * This is a frontend property only and is not saved/fetched to/from the database
   * It is only needed to find out which entries are in the local database only and
   * need to be synced.
   * IMPORTANT: As dexie cannot index boolean values the type number is the best option
   */
  @Exclude()
    isSynced: number = 1

  /**
   * This is a frontend property only and is not saved/fetched to/from the database
   * It is only needed to find out which entries were deleted while offline and
   * sync them respectively.
   * IMPORTANT: As dexie cannot index boolean values the type number is the best option
   */
  @Exclude()
    isDeleted: number = 0

  constructor (name: string, startLocation: Point, endLocation: Point, description: string, images: ImageUpload[] = []) {
    this.name = name
    this.startLocation = startLocation
    this.endLocation = endLocation
    this.description = description
    this.images = images
  }
}

export class Tour extends BaseTour {
  @Expose()
    id: string

  @Type(() => Date)
    createdAt: Date

  @Type(() => Date)
    updatedAt: Date

  constructor (id: string, name: string, startLocation: Point, endLocation: Point, description: string, createdAt: Date, updatedAt: Date) {
    super(name, startLocation, endLocation, description)
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

// todo: switch to baseTour
export type UpdateOrCreateTour = Pick<Tour, 'name' | 'description' | 'startLocation' | 'endLocation' | 'images'>

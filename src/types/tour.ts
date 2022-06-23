import { Point } from 'geojson'
import { Expose, Type } from 'class-transformer'

export class Tour {
  @Expose()
    id: string

  @Expose()
    name: string

  @Expose()
    startLocation: Point

  @Expose()
    endLocation: Point

  @Expose()
    description: string

  @Type(() => Date)
    createdAt: Date

  @Type(() => Date)
    updatedAt: Date

  constructor (id: string, name: string, startLocation: Point, endLocation: Point, description: string, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.name = name
    this.startLocation = startLocation
    this.endLocation = endLocation
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export type UpdateOrCreateTour = Pick<Tour, 'name' | 'description' | 'startLocation' | 'endLocation'>

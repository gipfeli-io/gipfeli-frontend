import {Point} from 'geojson'
import {Type} from 'class-transformer'

export class Tour {
    id: string
    name: string
    startLocation: Point
    endLocation: Point
    description: string
    @Type(() => Date)
    createdAt: Date
    @Type(() => Date)
    updatedAt: Date // todo: make nullable as for create this will not be set

    constructor(id: string, name: string, startLocation: Point, endLocation: Point, description: string, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.name = name
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
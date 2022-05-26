import {Point} from 'geojson'
import {Transform, Type} from 'class-transformer'
import dayjs, {Dayjs} from 'dayjs'

export class Tour {
    id: string
    name: string
    startLocation: Point
    endLocation: Point
    description: string
    @Type(() => Date)
    @Transform(({value}) => dayjs(value), {toClassOnly: true})
    createdAt: Dayjs
    @Type(() => Date)
    @Transform(({value}) => dayjs(value), {toClassOnly: true})
    updatedAt: Dayjs // todo: make nullable as for create this will not be set

    constructor(id: string, name: string, startLocation: Point, endLocation: Point, description: string, createdAt: Dayjs, updatedAt: Dayjs) {
        this.id = id
        this.name = name
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export type CreateTour = Pick<Tour, "name" | "description" | "startLocation" | "endLocation">
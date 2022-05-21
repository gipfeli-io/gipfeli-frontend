import {Point} from 'geojson'
import {Type} from 'class-transformer'

export class Tour {
    id!: string
    name!: string
    startLocation!: Point
    endLocation!: Point
    description!: string
    @Type(() => Date)
    createdAt!: Date
    @Type(() => Date)
    updatedAt!: Date // todo: make nullable as for create this will not be set

    public getFormattedCreatedAt(): string {
        return this.createdAt.toLocaleDateString('de-CH') //todo: this should be set according to the users translation settings
    }
}
import { Exclude, Expose } from 'class-transformer'

export class TourCategory {
  @Expose()
    id: string

  @Expose()
    name: string

  @Exclude()
    isSelected: boolean = false

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }
}

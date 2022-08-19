import { Exclude, Expose } from 'class-transformer'

export class TourCategory {
  @Expose()
    id: string

  @Expose()
    name: string

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }
}

export class UpdateTourCategory extends TourCategory {
  @Exclude()
    isSelected: boolean = false
}

import { Exclude, Expose } from 'class-transformer'

export class TourCategory {
  @Expose()
    id: string

  @Expose()
    name: string

  @Expose()
    iconName: string

  constructor (id: string, name: string, iconName: string) {
    this.id = id
    this.name = name
    this.iconName = iconName
  }
}

export class UpdateTourCategory extends TourCategory {
  @Exclude()
    isSelected: boolean = false
}

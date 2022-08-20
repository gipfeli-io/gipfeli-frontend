import APIService from '../api-service'
import { ArrayApiResponse } from '../../types/api'
import { TourCategory } from '../../types/tour-category'

export default class LookupService extends APIService {
  private prefix: string = 'lookup'

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
  }

  public async findAllTourCategories (): Promise<ArrayApiResponse<TourCategory>> {
    return this.fetchArrayDataFromApi(
      `${this.getRequestUrl(this.prefix)}/tour-categories`,
      this.getRequestBody('GET', {}),
      TourCategory
    )
  }
}

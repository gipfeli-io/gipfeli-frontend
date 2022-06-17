import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ArrayApiResponse, SingleApiResponse } from '../../types/api'

export default class ToursService extends APIService {
  private prefix: string = 'tours'

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
  }

  public async findAll (): Promise<ArrayApiResponse<Tour>> {
    const result = await this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      Tour
    )

    if (!result.content) {
      result.content = []
    }

    return result
  }

  public async findOne (id: string): Promise<SingleApiResponse<Tour>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )
  }

  public async create (tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
  }

  public async update (id: string, tour: UpdateOrCreateTour): Promise<SingleApiResponse<void>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
  }

  public async delete (id: string): Promise<SingleApiResponse<void>> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
  }
}

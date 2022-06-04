import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'

export default class ToursService extends APIService {
  private prefix: string = 'tours'

  constructor (token: string | undefined) {
    super()
    this.token = token
  }

  public async findAll (): Promise<any> {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {})
    )
  }

  public async findOne (id: string): Promise<Tour> {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {})
    )
  }

  public async create (tour: UpdateOrCreateTour) {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour)
    )
  }

  public async update (id: string, tour: UpdateOrCreateTour) {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
  }

  public async delete (id: string) {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
  }
}

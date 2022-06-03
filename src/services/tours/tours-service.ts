import APIService from '../api-service'
import { UpdateOrCreateTour } from '../../types/tour'

export default class ToursService extends APIService {
  private prefix: string = 'tours'

  constructor (session: any) {
    super()
    this.session = session
  }

  public async findAll (): Promise<any> {
    return await this.fetchDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {})
    )
  }

  public async findOne (id: string): Promise<Response> {
    return await fetch(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {})
    )
  }

  public async create (tour: UpdateOrCreateTour) {
    return await fetch(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour)
    )
  }

  public async update (id: string, tour: UpdateOrCreateTour) {
    return await fetch(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
  }

  public async delete (id: string) {
    return await fetch(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
  }
}

import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'

export default class ToursService extends APIService {
  private prefix: string = 'tours'

  constructor (token: string | undefined) {
    super()
    this.token = token
  }

  public async findAll (): Promise<any> {
    return await this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      Tour
    )
  }

  public async findOne (id: string): Promise<any> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )
  }

  public async create (tour: UpdateOrCreateTour): Promise<any> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
  }

  public async update (id: string, tour: UpdateOrCreateTour): Promise<any> {
    return await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour),
      Tour
    )
  }

  public async delete (id: string): Promise<void> {
    try {
      await this.fetchSingleDataFromApi(
        this.getRequestUrl(this.prefix, id),
        this.getRequestBody('DELETE', {}),
        Tour // todo...
      )
    } catch (e) {
      // Todo: Since delete from API does not return anything, we need to wrap this here :(
      console.log(e)
    }
  }
}

import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ArrayApiResponse, SingleApiResponse } from '../../types/api'
import { localDB } from '../../components/shared/local-database/local-db'

export default class ToursService extends APIService {
  private prefix: string = 'tours'

  constructor (token: string | undefined) {
    super()
    this.token = token
  }

  public async findAll (): Promise<ArrayApiResponse<Tour>> {
    const result = await this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      Tour
    )
    // todo: refactor to find more elegant implementation
    console.log('result status', result.statusCode)
    if (result.statusCode === 500) {
      const wrapper = this.createResponseWrapper(true, 200, 'fetched from local local-database')
      const tours = await localDB.tours.toArray()
      console.log('local tours', tours)
      return { content: tours, ...wrapper }
    }

    if (!result.content) {
      result.content = []
    }
    console.log('add tours to local local-database', result.content)
    ToursService.addToursToLocalDatabase(result.content)

    return result
  }

  private static addToursToLocalDatabase (tourList: Tour[]): void {
    localDB.tours.clear()
    localDB.tours.bulkAdd(tourList)
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

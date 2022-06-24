import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ArrayApiResponse, SingleApiResponse } from '../../types/api'
import LocalDatabaseService from '../local-database-service'

export default class ToursService extends APIService {
  private prefix: string = 'tours'
  private localDatabaseService: LocalDatabaseService

  constructor (token: string | undefined) {
    super()
    this.accessToken = token
    this.localDatabaseService = new LocalDatabaseService()
  }

  public async findAll (): Promise<ArrayApiResponse<Tour>> {
    const result = await this.fetchArrayDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('GET', {}),
      Tour
    )

    return this.handleTourListResult(result)
  }

  public async findOne (id: string): Promise<SingleApiResponse<Tour>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )
  }

  public async create (tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
  }

  public async update (id: string, tour: UpdateOrCreateTour): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('PATCH', tour)
    )
  }

  public async delete (id: string): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('DELETE', {})
    )
  }

  private async handleTourListResult (result: ArrayApiResponse<Tour>): Promise<ArrayApiResponse<Tour>> {
    if (result.statusCode === 500) {
      const wrapper = this.createResponseWrapper(true, 200, 'serve data from local database')
      const tours = await this.localDatabaseService.findAllTours()
      return { content: tours, ...wrapper }
    }
    if (!result.content) {
      result.content = []
    }
    await this.localDatabaseService.addTourList(result.content)
    return result
  }
}

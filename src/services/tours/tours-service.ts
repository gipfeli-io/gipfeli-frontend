import APIService from '../api-service'
import { Tour, UpdateOrCreateTour } from '../../types/tour'
import { ApiResponseWrapper, ArrayApiResponse, SingleApiResponse } from '../../types/api'
import LocalDatabaseService from '../local-database-service'
import dayjs from 'dayjs'

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
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix, id),
      this.getRequestBody('GET', {}),
      Tour
    )

    return this.handleGetOneResult(result, id)
  }

  public async create (tour: UpdateOrCreateTour): Promise<SingleApiResponse<Tour>> {
    const result = await this.fetchSingleDataFromApi(
      this.getRequestUrl(this.prefix),
      this.getRequestBody('POST', tour),
      Tour
    )
    return this.handleTourAddResult(tour, result)
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

  private async handleGetOneResult (result: SingleApiResponse<Tour>, tourId: string): Promise<SingleApiResponse<Tour>> {
    const localTour = await this.localDatabaseService.getOne(tourId)
    if (result.statusCode === 500 || result.statusCode === 404) {
      if (localTour) {
        const wrapper = this.getSuccessWrapper('got data from local database')
        return { content: localTour, ...wrapper }
      }

      if (result.statusCode === 500) {
        // todo: refactor
        result.statusCode = 404
        result.statusMessage = 'Could not find tour'
      }
    }

    if (!localTour && result.statusCode === 200) {
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private getSuccessWrapper (message: string): ApiResponseWrapper {
    return this.createResponseWrapper(true, 200, message)
  }

  private async handleTourAddResult (tour: UpdateOrCreateTour, result: SingleApiResponse<Tour>): Promise<SingleApiResponse<Tour>> {
    if (result.statusCode === 500) {
      const wrapper = this.getSuccessWrapper('added data to local database')
      const localTour = ToursService.createLocalTour(tour)
      await this.localDatabaseService.putTour(localTour)
      return { content: localTour, ...wrapper }
    } else if (result.statusCode === 201) {
      await this.localDatabaseService.putTour(result.content!)
    }

    return result
  }

  private static createLocalTour (tour: UpdateOrCreateTour): Tour {
    const id = crypto.randomUUID().toString()
    const localTour = new Tour(id, tour.name, {
      type: 'Point',
      coordinates: []
    }, {
      type: 'Point',
      coordinates: []
    }, tour.description, dayjs().toDate(), dayjs().toDate())
    localTour.isSynced = false
    return localTour
  }

  private async handleTourListResult (result: ArrayApiResponse<Tour>): Promise<ArrayApiResponse<Tour>> {
    if (result.statusCode === 500) {
      const wrapper = this.getSuccessWrapper('serve data from local database')
      const tours = await this.localDatabaseService.findAllTours()
      return { content: tours, ...wrapper }
    } else {
      if (!result.content) {
        result.content = []
      }
      await this.localDatabaseService.addTourList(result.content)
      result.content = await this.localDatabaseService.findAllTours()

      return result
    }
  }
}

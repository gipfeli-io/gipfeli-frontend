import APIService from './api-service'
import { SingleApiResponse } from '../types/api'

export default class HeartbeatService extends APIService {
  public checkHeartbeat (): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      `${this.getRequestUrl('')}heartbeat`,
      this.getRequestBody('GET', {})
    )
  }
}

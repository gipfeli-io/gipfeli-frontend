import APIService from './api-service'
import { SingleApiResponse } from '../types/api'

export default class HeartbeatService extends APIService {
  private requestUrl: string = process.env.REACT_APP_PUBLIC_BACKEND_API || 'http://localhost:3000'

  public checkHeartbeat (): Promise<SingleApiResponse<void>> {
    return this.fetchSingleDataFromApi(
      this.requestUrl + '/heartbeat',
      this.getRequestBody('GET', {})
    )
  }
}

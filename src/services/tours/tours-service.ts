import APIService from '../api-service'
import {Session} from 'next-auth'

export default class ToursService extends APIService {
    private prefix: string = 'tours'

    constructor(session: Session) {
        super()
        this.session = session
    }

    public async findAll(): Promise<any> {
        return await this.fetchDataFromApi(
            this.getRequestUrl(this.prefix),
            this.getRequestBody('get', {})
        )
    }

    public async findOne(id: string): Promise<Response> {
        return await fetch(
            this.getRequestUrl(this.prefix, id),
            this.getRequestBody('get', {}),
        )
    }
}
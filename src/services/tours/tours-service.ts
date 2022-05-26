import APIService from '../api-service'
import {Session} from 'next-auth'
import {UpdateOrCreateTour} from '../../types/tour'
import {instanceToPlain} from 'class-transformer'

export default class ToursService extends APIService {
    private prefix: string = 'tours'

    constructor(session: Session) {
        super()
        this.session = session
    }

    public async findAll(): Promise<any> {
        return await this.fetchDataFromApi(
            this.getRequestUrl(this.prefix),
            this.getRequestBody('GET', {})
        )
    }

    public async findOne(id: string): Promise<Response> {
        return await fetch(
            this.getRequestUrl(this.prefix, id),
            this.getRequestBody('GET', {}),
        )
    }

    public async create(tour: UpdateOrCreateTour) {
        return await fetch(
            this.getRequestUrl(this.prefix),
            this.getRequestBody('POST', tour),
        )
    }

    public async update(id: string, tour: UpdateOrCreateTour) {
        const x = instanceToPlain(tour, {excludeExtraneousValues: true})
        console.log(x)
        return await fetch(
            this.getRequestUrl(this.prefix, id),
            this.getRequestBody('PATCH', tour),
        )
    }
}
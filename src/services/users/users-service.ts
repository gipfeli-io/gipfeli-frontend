import APIService from '../api-service'
import {Session} from 'next-auth'

export default class UsersService extends APIService {
    private prefix: string = 'users'

    constructor(session: Session) {
        super()
        this.session = session
    }

    public async profile(): Promise<Response> {
        return await fetch(
            this.getRequestUrl(this.prefix, 'profile'),
            this.getRequestBody('GET', {}),
        )
    }
}
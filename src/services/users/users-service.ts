import APIService from '../api-service'
import {getSession} from 'next-auth/react'
import {Session} from 'next-auth'

export default class UsersService extends APIService {
    private static prefix: string = 'users'

    public static async profile(session: Session): Promise<Response> { // todo: still a bit ugly with session injection
        return await fetch(
            this.getRequestUrl(this.prefix, 'profile'),
            this.getRequestBody('get', {}, session),
        )
    }
}
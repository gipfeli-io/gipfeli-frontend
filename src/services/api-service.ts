import {Session} from 'next-auth'

interface RequestBody {
    headers: {
        'Content-Type': string
        'Authorization'?: string
    };
    method: string;
    body?: string;
}


export default abstract class APIService {
    protected static baseUrl: string = process.env.BACKEND_API || 'http://localhost:3000'

    protected static getRequestUrl(prefix: string, endpoint: string): string {
        return `${this.baseUrl}/${prefix}/${endpoint}`
    }


    protected static getRequestBody(method: 'get' | 'post' | 'put' | 'delete', body?: any, session?: Session): RequestBody {
        let requestBody: RequestBody = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        if (method !== 'get') {
            requestBody.body = body ? JSON.stringify(body) : ''
        }

        if (session) {
            requestBody.headers = {...requestBody.headers, 'Authorization': this.extractBearerTokenFromSession(session)}
        }

        return requestBody
    }

    private static extractBearerTokenFromSession(session: Session) {
        return `Bearer ${session.accessToken}`
    }


}
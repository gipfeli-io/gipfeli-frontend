import {Session} from 'next-auth'

export interface RequestBody {
    headers: {
        'Content-Type': string
        'Authorization'?: string
    };
    method: string;
    body?: string;
}


export default abstract class APIService {
    private baseUrl: string = process.env.BACKEND_API || 'http://localhost:3000'
    protected session?: Session = undefined

    protected getRequestUrl(prefix: string, endpoint: string): string {
        return `${this.baseUrl}/${prefix}/${endpoint}`
    }

    protected getRequestBody(method: 'get' | 'post' | 'put' | 'delete', body?: any): RequestBody {
        let requestBody: RequestBody = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        if (method !== 'get') {
            requestBody.body = body ? JSON.stringify(body) : ''
        }

        if (this.session) {
            requestBody.headers = {...requestBody.headers, 'Authorization': this.extractBearerTokenFromSession()}
        }

        return requestBody
    }

    private extractBearerTokenFromSession(): string {
        return `Bearer ${this.session!.accessToken}`
    }


}
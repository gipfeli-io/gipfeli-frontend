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
    protected session?: Session = undefined
    private baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:3000'

    protected getRequestUrl(prefix: string, endpoint?: string): string {
        const baseUrl = `${this.baseUrl}/${prefix}`
        return endpoint ? `${baseUrl}/${endpoint}` : baseUrl
    }

    protected getRequestBody(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', body?: any): RequestBody {
        let requestBody: RequestBody = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        if (method !== 'GET') {
            requestBody.body = body ? JSON.stringify(body) : ''
        }

        if (this.session) {
            requestBody.headers = {...requestBody.headers, 'Authorization': this.extractBearerTokenFromSession()}
        }

        return requestBody
    }

    protected async fetchDataFromApi(url: string, body: RequestBody): Promise<any> {
        const result = await fetch(url, body)
        const raw = await result.json()

        return raw
    }

    private extractBearerTokenFromSession(): string {
        return `Bearer ${this.session!.accessToken}`
    }


}
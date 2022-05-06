interface RequestBody {
    headers: { 'Content-Type': string };
    method: string;
    body: string;
}


export default abstract class APIService {
    protected static baseUrl: string = process.env.BACKEND_API || 'http://localhost:3001'

    protected static getRequestUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`
    }

    protected static getRequestBody(method: 'get' | 'post' | 'put' | 'delete', body?: any): RequestBody {
        return {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : ''
        }
    }


}
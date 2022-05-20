import APIService from '../api-service'
import {Session} from 'next-auth'
import {Tour} from '../../types/tour'

const serviceResponse: Tour[] = [
    {
        'id': '7eb9cfff-d76f-4421-9064-586cc0511a30',
        'name': 'test from nest, with user? yes but sabrinas tour now :) ',
        'startLocation': {
            'type': 'Point',
            'coordinates': [
                7.920462,
                47.328439
            ]
        },
        'endLocation': {
            'type': 'Point',
            'coordinates': [
                47.328439,
                7.920462
            ]
        },
        'description': 'description from nest',
        'createdAt': '2020-05-18T18:27:11.887Z' as unknown as Date,
        'updatedAt': '2005-05-18T18:27:11.887Z' as unknown as Date,
    },
    {
        'id': 'a815f336-1586-4857-a9cc-b521dac7d3c2',
        'name': 'test from nest, with user? yes but sabrinas tour now :) ',
        'startLocation': {
            'type': 'Point',
            'coordinates': [
                7.920462,
                47.328439
            ]
        },
        'endLocation': {
            'type': 'Point',
            'coordinates': [
                7.920462,
                47.328439
            ]
        },
        'description': 'description from nest',
        'createdAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
        'updatedAt': '2022-01-18T18:27:11.887Z' as unknown as Date,
    },
    {
        'id': '48d5f0d1-1f6a-4e63-8968-44f0718c979a',
        'name': 'test from nest, with user? yes but sabrinas tour now :) ',
        'startLocation': {
            'type': 'Point',
            'coordinates': [
                7.920462,
                48.328439
            ]
        },
        'endLocation': {
            'type': 'Point',
            'coordinates': [
                7.920462,
                47.328439
            ]
        },
        'description': 'description from nest',
        'createdAt': '2022-01-18T18:27:11.887Z' as unknown as Date,
        'updatedAt': '2022-04-18T18:27:11.887Z' as unknown as Date,
    }
]

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class ToursService extends APIService {
    private prefix: string = 'tours'

    constructor(session: Session) {
        super()
        this.session = session
    }

    public async mockAll(): Promise<Tour[]> {
        await sleep(150)
        return serviceResponse
    }
}
import APIService from '../api-service'
import {Session} from 'next-auth'
import {Tour} from '../../types/tour'
import {Dayjs} from 'dayjs'

function loremIpsumGenerator(numberOfParagraphs: number = 1): string {
    const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n'

    return paragraph.repeat(numberOfParagraphs)
}

const serviceResponse: Tour[] = [
    {
        'id': '7eb9cfff-d76f-4421-9064-586cc0511a30',
        'name': 'Tour from A to B ',
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
        'description': loremIpsumGenerator(5),
        'createdAt': '2020-05-18T18:27:11.887Z' as unknown as Dayjs,
        'updatedAt': '2005-05-18T18:27:11.887Z' as unknown as Dayjs,
    },
    {
        'id': 'a815f336-1586-4857-a9cc-b521dac7d3c2',
        'name': 'Presummer Vibes in Berne',
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
        'description': loremIpsumGenerator(3),
        'createdAt': '2022-05-18T18:27:11.887Z' as unknown as Dayjs,
        'updatedAt': '2022-01-18T18:27:11.887Z' as unknown as Dayjs,
    },
    {
        'id': '48d5f0d1-1f6a-4e63-8968-44f0718c979a',
        'name': 'Many nice views above Spiez',
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
        'description': loremIpsumGenerator(22),
        'createdAt': '2022-01-18T18:27:11.887Z' as unknown as Dayjs,
        'updatedAt': '2022-04-18T18:27:11.887Z' as unknown as Dayjs,
    }
]

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
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

    public async mockOne(id: string): Promise<Tour> {
        await sleep(150)
        return serviceResponse.find((tour) => tour.id === id)!
    }
}
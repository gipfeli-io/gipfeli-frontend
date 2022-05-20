import {NextPageContext} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import {Tour} from '../../types/tour'
import TourList from '../../components/app/TourList'
import Typography from '@mui/material/Typography'
import {plainToClass, plainToInstance} from 'class-transformer'

type AppHomeProps = {
    tours: Tour[]
}

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
        'createdAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
        'updatedAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
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
        'updatedAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
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
        'createdAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
        'updatedAt': '2022-05-18T18:27:11.887Z' as unknown as Date,
    }
]

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    const service = undefined // create TourService instance
    const res = undefined // call TourService.getTours() property
    const body: Tour[] = serviceResponse // call res.json()

    return {
        props: {
            tours: body
        }
    }
})

const AppHome = ({tours}: AppHomeProps) => {
    const a = plainToInstance(Tour, tours)
    console.log(a)
    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                My Tours
            </Typography>
            <TourList rows={a}/>
        </AppPageLayout>
    )
}

export default AppHome
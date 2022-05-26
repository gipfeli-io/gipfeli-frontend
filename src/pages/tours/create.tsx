import AppPageLayout from '../../layouts/app-page-layout'
import Typography from '@mui/material/Typography'
import TourForm from '../../components/app/TourForm'
import {CreateTour} from '../../types/tour'
import {GetServerSideProps} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import ToursService from '../../services/tours/tours-service'
import {useRouter} from 'next/router'

type createTourProps = {
    user: Session
}

export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    return {
        props: {
            user: session
        }
    }
})

const NewTour = ({user}: createTourProps) => {
    const router = useRouter()
    const service = new ToursService(user)

    const tour: CreateTour = {
        name: '',
        description: '',
        startLocation: { // Todo: make empty and add points in edit
            'type': 'Point',
            'coordinates': [
                7.920462,
                47.328439
            ]
        },
        endLocation: {
            'type': 'Point',
            'coordinates': [
                47.328439,
                7.920462
            ]
        },
    }

    const handleSave: (tour: CreateTour) => void = async (tour: CreateTour) => {
        const result = await service.create(tour) // todo: handle errors
        if (result.ok) {
            await router.push('/tours')
        }
    }

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Create Tour
            </Typography>
            <TourForm tour={tour} handleSave={handleSave}/>
        </AppPageLayout>
    )
}

export default NewTour
import AppPageLayout from '../../layouts/app-page-layout'
import Typography from '@mui/material/Typography'
import TourForm from '../../components/app/TourForm'
import {UpdateOrCreateTour} from '../../types/tour'
import {GetServerSideProps} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import ToursService from '../../services/tours/tours-service'
import {useRouter} from 'next/router'
import {handleSave} from '../../types/handle-save'

type CreateTourProps = {
    user: Session
}

export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    return {
        props: {
            user: session
        }
    }
})

const NewTour = ({user}: CreateTourProps) => {
    const router = useRouter()
    const service = new ToursService(user)

    const tour: UpdateOrCreateTour = {
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

    const handleSave: handleSave<UpdateOrCreateTour> = async (tour: UpdateOrCreateTour) => {
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
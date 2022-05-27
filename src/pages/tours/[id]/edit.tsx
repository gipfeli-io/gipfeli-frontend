import {GetServerSideProps} from 'next'
import {Session} from 'next-auth'
import Typography from '@mui/material/Typography'
import {withAuthenticatedOrRedirect} from '../../../utils/with-authenticated-or-redirect'
import {Tour, UpdateOrCreateTour} from '../../../types/tour'
import AppPageLayout from '../../../layouts/app-page-layout'
import TourForm from '../../../components/app/TourForm'
import ToursService from '../../../services/tours/tours-service'
import {RouteParams} from '../../../types/route-params'
import {useRouter} from 'next/router'
import {handleSave} from '../../../types/handle-save'

type EditTourProps = {
    id: string
    tour: UpdateOrCreateTour
    user: Session
}

export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const {id} = context.params as RouteParams
    const service = new ToursService(session)
    const res = await service.findOne(id)
    const body: Tour = await res.json()

    const tourToEdit: UpdateOrCreateTour = {
        description: body.description,
        name: body.name,
        startLocation: body.startLocation,
        endLocation: body.endLocation
    }

    return {
        props: {
            id: id,
            tour: tourToEdit,
            user: session
        }
    }
})

const EditTour = ({id, tour, user}: EditTourProps) => {
    const router = useRouter()
    const service = new ToursService(user)

    const handleSave: handleSave<UpdateOrCreateTour> = async (tour: UpdateOrCreateTour) => {
        const result = await service.update(id, tour) // todo: handle errors
        if (result.ok) {
            await router.push('/tours')
        }
    }


    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Edit Tour
            </Typography>
            <TourForm tour={tour} handleSave={handleSave} type={'Edit'}/>
        </AppPageLayout>
    )
}

export default EditTour
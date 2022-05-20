import {NextPageContext} from 'next'
import {Session} from 'next-auth'
import Typography from '@mui/material/Typography'
import {withAuthenticatedOrRedirect} from "../../../utils/with-authenticated-or-redirect";
import {Tour} from "../../../types/tour";
import AppPageLayout from "../../../layouts/app-page-layout";
import TourForm from "../../../components/app/TourForm";
import ToursService from "../../../services/tours/tours-service";
import {plainToInstance} from "class-transformer";
import {NextPageWithAuth} from '../../../types/auth-extended-page'

type EditTourProps = {
    tour: Tour
}

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    console.log('param id: ', context.query.id)
    const service = new ToursService(session) // create TourService instance
    const res = await service.mockOne() // call TourService.getTour(id) property
    const body: Tour = res // call res.json()

    return {
        props: {
            tour: body
        }
    }
})

const EditTour: NextPageWithAuth = ({tour}: EditTourProps) => {
    tour = plainToInstance(Tour, tour) // todo: maybe have this in a generic fashion?

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Edit Tour
            </Typography>
            <TourForm tour={tour}/>
        </AppPageLayout>
    )
}

export default EditTour
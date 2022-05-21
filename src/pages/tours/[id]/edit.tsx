import {GetServerSideProps, NextPageContext} from 'next'
import {Session} from 'next-auth'
import Typography from '@mui/material/Typography'
import {withAuthenticatedOrRedirect} from "../../../utils/with-authenticated-or-redirect";
import {Tour} from "../../../types/tour";
import AppPageLayout from "../../../layouts/app-page-layout";
import TourForm from "../../../components/app/TourForm";
import ToursService from "../../../services/tours/tours-service";
import {plainToInstance} from "class-transformer";
import {RouteParams} from '../../../types/route-params'

type EditTourProps = {
    tour: Tour
}

export const getServerSideProps:GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const {id} = context.params as RouteParams
    console.log('param id: ', id)
    const service = new ToursService(session) // create TourService instance
    const res = await service.mockOne(id) // call TourService.getTour(id) property
    const body: Tour = res // call res.json()

    return {
        props: {
            tour: body
        }
    }
})

const EditTour = ({tour}: EditTourProps) => {
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
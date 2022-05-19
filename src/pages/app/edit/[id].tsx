import {NextPageContext} from 'next'
import {Session} from 'next-auth'
import Typography from '@mui/material/Typography'
import {withAuthenticatedOrRedirect} from "../../../utils/with-authenticated-or-redirect";
import {Tour} from "../../../types/tour";
import AppPageLayout from "../../../layouts/app-page-layout";
import TourForm from "../../../components/app/TourForm";

type EditTourProps = {
    tour: Tour
}

const serviceResponse: Tour =
    {
        'id': '7eb9cfff-d76f-4421-9064-586cc0511a30',
        'name': 'Very cool tour',
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
        'description': 'This is a very cool tour. *****',
    }

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    console.log('param id: ', context.query.id)
    const service = undefined // create TourService instance
    const res = undefined // call TourService.getTour(id) property
    const body: Tour = serviceResponse // call res.json()

    return {
        props: {
            tour: body
        }
    }
})

const EditTour = ({tour}: EditTourProps) => {
    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Edit Tour
            </Typography>
            <TourForm tour={tour} formType="create"/>
        </AppPageLayout>
    )
}

export default EditTour
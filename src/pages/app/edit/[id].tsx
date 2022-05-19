import {NextPageContext} from 'next'
import {Session} from 'next-auth'
import Typography from '@mui/material/Typography'
import {withAuthenticatedOrRedirect} from "../../../utils/with-authenticated-or-redirect";
import {Tour} from "../../../types/tour";
import AppPageLayout from "../../../layouts/app-page-layout";
import TourForm from "../../../components/app/TourForm";
import {sampleTourData} from "../../../utils/sample-data";

type EditTourProps = {
    tour: Tour
}

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    console.log('param id: ', context.query.id)
    const service = undefined // create TourService instance
    const res = undefined // call TourService.getTour(id) property
    const body: Tour = sampleTourData[0] // call res.json()

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
            <TourForm tour={tour}/>
        </AppPageLayout>
    )
}

export default EditTour
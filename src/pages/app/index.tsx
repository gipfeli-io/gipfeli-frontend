import {NextPageContext} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import Typography from '@mui/material/Typography'
import {Tour} from '../../types/tour'
import TourList from '../../components/app/TourList'
import {sampleTourData} from "../../utils/sample-data";
import {Button, Grid} from "@mui/material";

type AppHomeProps = {
    tours: Tour[]
}

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    const service = undefined // create TourService instance
    const res = undefined // call TourService.getTours() property
    const body: Tour[] = sampleTourData // call res.json()

    return {
        props: {
            tours: body
        }
    }
})

const AppHome = ({tours}: AppHomeProps) => {
    return (
        <AppPageLayout>
            <Grid container spacing={4} direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h2" gutterBottom component="div">
                        My Tours
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} alignItems={'end'}>
                    <Button href="/app/create" variant="contained">
                        Add Tour
                    </Button>
                </Grid>
            </Grid>
            <TourList rows={tours}/>
        </AppPageLayout>
    )
}

export default AppHome
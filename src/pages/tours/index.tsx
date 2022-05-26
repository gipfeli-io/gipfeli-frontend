import {GetServerSideProps, NextPageContext} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import {Tour} from '../../types/tour'
import TourList from '../../components/app/TourList'
import Typography from '@mui/material/Typography'
import {plainToInstance} from 'class-transformer'
import ToursService from '../../services/tours/tours-service'
import {Button, Grid} from "@mui/material";

type AppHomeProps = {
    tours: Tour[]
}


export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const service = new ToursService(session)
    const res = await service.findAll()
    const body: Tour[] = await res.json()

    return {
        props: {
            tours: body
        }
    }
})

const AppHome = ({tours}: AppHomeProps): JSX.Element => {
    tours = plainToInstance(Tour, tours) // todo: maybe have this in a generic fashion?

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                My Tours
            </Typography>
            <Grid container mb={2} direction={'row'} justifyContent='flex-end'>
                <Grid item>
                    <Button href="tours/create" variant="contained">
                        Add Tour
                    </Button>
                </Grid>
            </Grid>
            <TourList rows={tours}/>
        </AppPageLayout>
    )
}

export default AppHome
import {NextPageContext} from 'next'
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


export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    const service = new ToursService(session)
    const res = await service.mockAll()
    const body: Tour[] = res // call res.json()

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
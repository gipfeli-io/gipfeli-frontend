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
import {NextPageWithAuth} from '../../types/auth-extended-page'
import useSWR from 'swr'

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

const AppHome: NextPageWithAuth<AppHomeProps> = ({tours}): JSX.Element => {
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
            <TourList/>
        </AppPageLayout>
    )
}

export default AppHome
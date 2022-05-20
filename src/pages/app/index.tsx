import {NextPageContext} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import {Tour} from '../../types/tour'
import TourList from '../../components/app/TourList'
import Typography from '@mui/material/Typography'
import {plainToInstance} from 'class-transformer'
import ToursService from '../../services/tours/tours-service'

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
            <Typography variant="h2" gutterBottom component="div">
                My Tours
            </Typography>
            <TourList rows={tours}/>
        </AppPageLayout>
    )
}

export default AppHome
import {GetServerSideProps} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import {Tour} from '../../types/tour'
import Typography from '@mui/material/Typography'
import {plainToInstance} from 'class-transformer'
import ToursService from '../../services/tours/tours-service'
import {Divider, Grid, Link as MuiLink} from '@mui/material'
import Link from 'next/link'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {RouteParams} from '../../types/route-params'
import MapWrapper from '../../components/shared/map/MapWrapper'
import WayPointMarkerLayer from '../../components/shared/map/layers/WayPointMarkerLayer'

type TourDetailProps = {
    tour: Tour
}

export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const {id} = context.params as RouteParams
    const service = new ToursService(session)
    const res = await service.mockOne(id)
    const body: Tour = res

    return {
        props: {
            tour: body
        }
    }
})

const TourDetail = ({tour}: TourDetailProps): JSX.Element => {
    tour = plainToInstance(Tour, tour) // todo: maybe have this in a generic fashion?

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                {tour.name}
                <Link href={`${tour.id}/edit`} passHref>
                    <MuiLink><EditIcon/></MuiLink>
                </Link>
                <Link href={`${tour.id}/delete`} passHref>
                    <MuiLink><DeleteIcon/></MuiLink>
                </Link>
            </Typography>
            <Grid container mb={2} direction={'row'} spacing={5}>
                <Grid item>
                    <Typography variant="subtitle1" gutterBottom component="div">
                        Created at: {tour.createdAt.format('DD.MM.YYYY hh:mm')}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" gutterBottom component="div">
                        Last updated at: {tour.updatedAt.format('DD.MM.YYYY hh:mm')}
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
            <MapWrapper>
                <WayPointMarkerLayer features={[tour.startLocation,  tour.endLocation]}/>
            </MapWrapper>
            <Grid container mb={2} mt={2} direction={'column'}>
                <Grid item>
                    <Typography variant="h5" gutterBottom component="div">
                        Tour description
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" gutterBottom component="div" whiteSpace={'pre-wrap'}>
                        {tour.description}
                    </Typography>
                </Grid>
            </Grid>
        </AppPageLayout>
    )
}

export default TourDetail
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
import {useState} from 'react'
import {TourDeleteConfirmation} from '../../components/app/tour-list/TourDeleteConfirmation'
import {useRouter} from 'next/router'

type TourDetailProps = {
    tour: Tour
    user: Session
}

export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const {id} = context.params as RouteParams
    const service = new ToursService(session)
    const res = await service.findOne(id)
    const body: Tour = await res.json()

    return {
        props: {
            tour: body,
            user: session
        }
    }
})

const TourDetail = (props: TourDetailProps): JSX.Element => {
    const router = useRouter()
    const [tour, setTour] = useState(plainToInstance(Tour, props.tour))
    const [open, setOpen] = useState(false)
    const service = new ToursService(props.user)

    const handleDeleteModalClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        await service.delete(tour.id)
        handleDeleteModalClose()
        router.push('/tours')
    }

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                {tour.name}
                <Link href={`${tour.id}/edit`} passHref>
                    <MuiLink><EditIcon/></MuiLink>
                </Link>
                <MuiLink onClick={() => setOpen(true)}><DeleteIcon/></MuiLink>
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
            <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
        </AppPageLayout>
    )
}

export default TourDetail
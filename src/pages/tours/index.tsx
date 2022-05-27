import {GetServerSideProps} from 'next'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'
import {Tour} from '../../types/tour'
import TourList from '../../components/app/tour-list/TourList'
import Typography from '@mui/material/Typography'
import {plainToInstance} from 'class-transformer'
import ToursService from '../../services/tours/tours-service'
import {Button, Grid} from '@mui/material'
import TourListContext, {TourListContextProperties} from '../../components/app/tour-list/TourListContext'
import {useState} from 'react'
import {TourDeleteConfirmation} from '../../components/app/tour-list/TourDeleteConfirmation'

type AppHomeProps = {
    tours: Tour[]
    user: Session
}


export const getServerSideProps: GetServerSideProps = (context) => withAuthenticatedOrRedirect(context, async (context, session: Session) => {
    const service = new ToursService(session)
    const res = await service.findAll()

    return {
        props: {
            tours: res,
            user: session
        }
    }
})

const AppHome = ({tours, user}: AppHomeProps): JSX.Element => {
    const service = new ToursService(user)
    const [tourList, setTourList] = useState(plainToInstance(Tour, tours))
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleDeleteModalClose = () => {
        setDeleteId(null)
        setOpen(false)
    }

    const handleDelete = async () => {
        await service.delete(deleteId!)
        setTourList(prevState => prevState.filter(tour => tour.id !== deleteId))
        handleDeleteModalClose()
    }

    const deleteHandler: TourListContextProperties = {
        deleteEvent: id => {
            setOpen(true)
            setDeleteId(id)
        }
    }

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                My Tours
            </Typography>
            <Grid container mb={2} direction={'row'} justifyContent="flex-end">
                <Grid item>
                    <Button href="tours/create" variant="contained">
                        Add Tour
                    </Button>
                </Grid>
            </Grid>
            <TourListContext.Provider value={deleteHandler}>
                <TourList rows={tourList}/>
            </TourListContext.Provider>
            <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
        </AppPageLayout>
    )
}

export default AppHome
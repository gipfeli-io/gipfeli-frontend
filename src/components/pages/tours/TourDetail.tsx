import Typography from '@mui/material/Typography'
import { Divider, Grid, Link as MuiLink } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import WayPointMarkerLayer from '../../shared/map/layers/WayPointMarkerLayer'
import ToursService from '../../../services/tours/tours-service'
import { TourDeleteConfirmation } from '../../app/tour-list/TourDeleteConfirmation'
import MapWrapper from '../../shared/map/MapWrapper'
import { Tour } from '../../../types/tour'
import { Link } from 'react-router-dom'
import Loader from '../../shared/Loader'
import useApiError from '../../../hooks/use-api-error'

const TourDetail = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const service = new ToursService(auth.token)
  const [tour, setTour] = useState<Tour | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const throwError = useApiError()

  useEffect(() => {
    async function fetchTour () {
      const data = await service.findOne(id!)
      if (data.success) {
        setTour(data.content!)
      } else {
        throwError(data)
      }
    }

    fetchTour()
  }, [])

  const handleDeleteModalClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    await service.delete(tour!.id)
    handleDeleteModalClose()
    navigate('/tours')
  }

  if (!tour) {
    return (<Loader />)
  }
  return (
      <>
        <Typography variant="h2" gutterBottom component="div">
          {tour.name}
            <MuiLink component={Link} to='edit'><EditIcon/></MuiLink>
          <MuiLink href="#" onClick={() => setOpen(true)}><DeleteIcon/></MuiLink>
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
          <WayPointMarkerLayer features={[tour.startLocation, tour.endLocation]}/>
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
        <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
      </>
  )
}

export default TourDetail

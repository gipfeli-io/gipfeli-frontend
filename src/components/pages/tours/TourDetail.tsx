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
import { Tour, TourPoint } from '../../../types/tour'
import { Link } from 'react-router-dom'
import Loader from '../../shared/Loader'
import useApiError from '../../../hooks/use-api-error'
import { dateTimeFormat } from '../../../utils/constants'
import dayjs from 'dayjs'
import ImageGallery from '../../shared/images/gallery/ImageGallery'
import useConnectionStatus from '../../../hooks/use-connection-status'
import { ImageUpload } from '../../../types/media'
import GpsImageMarkerLayer from '../../shared/map/layers/GpsImageMarkerLayer'

const TourDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const service = new ToursService(auth.token)
  const [tour, setTour] = useState<Tour | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [geoReferencedImages, setGeoReferencedImages] = useState<ImageUpload[]>([])
  const throwError = useApiError()
  const { isOffline } = useConnectionStatus()

  useEffect(() => {
    async function fetchTour () {
      const data = await service.findOne(id!)
      if (data.success) {
        setTour(data.content)
      } else {
        throwError(data)
      }
    }

    fetchTour()
  }, [])

  useEffect(() => {
    if (tour && tour.images && tour.images.length > 0) {
      setGeoReferencedImages(tour.images.filter((image) => image.location))
    }
  }, [tour])

  const handleDeleteModalClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    await service.delete(tour!.id)
    handleDeleteModalClose()
    navigate('/tours')
  }

  if (!tour) {
    return (<Loader/>)
  }
  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        {tour.name}
        <MuiLink component={Link} to="edit"><EditIcon/></MuiLink>
        <MuiLink href="#" onClick={() => setOpen(true)}><DeleteIcon/></MuiLink>
      </Typography>
      <Grid container mb={2} direction={'row'} spacing={5}>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom component="div">
            Created at: {dayjs(tour.createdAt).format(dateTimeFormat)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom component="div">
            Last updated at: {dayjs(tour.updatedAt).format(dateTimeFormat)}
          </Typography>
        </Grid>
      </Grid>
      <Divider/>
      {!isOffline() &&
          <>
              <MapWrapper>
                  <WayPointMarkerLayer features={[new TourPoint(tour.startLocation), new TourPoint(tour.endLocation)]}/>
                  <GpsImageMarkerLayer features={geoReferencedImages}/>
              </MapWrapper>
          </>
      }
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
      {!isOffline() && tour.images && tour.images.length > 0 &&
          <Grid container mb={2} mt={2} direction={'column'}>
              <Grid item>
                  <Typography variant="h5" gutterBottom component="div">
                      Tour images
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                      Click on an image to open its fullscreen original.
                  </Typography>
              </Grid>
              <Grid item>
                  <ImageGallery images={tour.images}/>
              </Grid>
          </Grid>
      }
      <TourDeleteConfirmation open={open} onClose={handleDeleteModalClose} onClick={handleDelete}/>
    </>
  )
}

export default TourDetail

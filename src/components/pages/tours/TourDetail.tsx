import Typography from '@mui/material/Typography'
import { Grid, Link as MuiLink } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import WayPointMarkerLayer from '../../shared/map/layers/WayPointMarkerLayer'
import ToursService from '../../../services/tours/tours-service'
import MapWrapper from '../../shared/map/MapWrapper'
import { Tour, TourPoint } from '../../../types/tour'
import Loader from '../../shared/Loader'
import useApiError from '../../../hooks/use-api-error'
import ImageGallery from '../../shared/images/gallery/ImageGallery'
import useConnectionStatus from '../../../hooks/use-connection-status'
import { ImageUpload } from '../../../types/media'
import GpsImageMarkerLayer from '../../shared/map/layers/GpsImageMarkerLayer'
import LocalDatabaseService from '../../../services/local-database-service'
import { TourStatusType } from '../../../enums/tour-status-type'
import { formatDate } from '../../../utils/date-conversion-helper'
import DeleteConfirmation from '../../shared/confirmation/DeleteConfirmation'
import useCheckConnection from '../../../hooks/use-check-connection'
import useErrorHandling from '../../../hooks/use-error-handling'
import getCloudStorageUrlForIdentifier from '../../../utils/storage-helper'
import DescriptionIcon from '@mui/icons-material/Description'
import GpxDataLayer from '../../shared/map/layers/GpxDataLayer'
import MarkdownElement from '../../shared/rich-text/MarkdownElement'
import CategoryList from '../../app/TourCategoryList'
import { FormType } from '../../../enums/form-type'
import DeleteEntryProvider from '../../providers/DeleteEntryProvider'
import EntryManagementActions from '../../shared/EntryManagementActions'
import FullScreenControl from '../../shared/map/controls/FullScreenControl'

const TourDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const service = new ToursService(auth.token)
  const [tour, setTour] = useState<Tour | undefined>(undefined)
  const [geoReferencedImages, setGeoReferencedImages] = useState<ImageUpload[]>([])
  const throwError = useApiError()
  const { isOffline } = useConnectionStatus()
  const checkConnection = useCheckConnection()
  const { triggerError } = useErrorHandling()
  const localDatabaseService = new LocalDatabaseService(auth.token)

  useEffect(() => {
    function setLocalTour (localTour: Tour | undefined) {
      if (localTour) {
        setTour(localTour)
      } else {
        throwError(localDatabaseService.getTourNotFoundResponse())
      }
    }

    async function fetchTour () {
      try {
        const localTour = await localDatabaseService.getOne(id)
        if (isOffline()) {
          setLocalTour(localTour)
        } else if (localTour?.status === TourStatusType.CREATED) {
          setLocalTour(localTour)
          checkConnection()
        } else {
          const data = await service.findOne(id)
          if (data.success) {
            setTour(data.content)
          } else {
            throwError(data)
          }
        }
      } catch (error: unknown) {
        triggerError(error as Error)
      }
    }

    fetchTour()
  }, [])

  useEffect(() => {
    if (tour && tour.images && tour.images.length > 0) {
      setGeoReferencedImages(tour.images.filter((image) => image.location))
    }
  }, [tour])

  const handleDelete = async (deleteId: string) => {
    const localTour = await localDatabaseService.getOne(deleteId)
    if (isOffline()) {
      await localDatabaseService.markTourAsDeleted(deleteId)
    } else if (localTour && localTour.status === TourStatusType.DELETED) {
      await localDatabaseService.deleteTour(deleteId)
    } else {
      await service.delete(deleteId)
    }

    navigate('/tours')
  }

  const getWayPointMarkerFeatures = (): TourPoint[] => {
    if (tour) {
      return [new TourPoint(tour.startLocation), new TourPoint(tour.endLocation)]
    }

    return []
  }

  if (!tour) {
    return (<Loader/>)
  }

  return (
    <>
      <DeleteEntryProvider id={id}>
        <Typography variant="h2" gutterBottom component="div" mt={2}>
          {tour.name}
          <EntryManagementActions id={tour.id} canEdit canDelete prependIdForEdit={false}/>
        </Typography>
        <Grid container mb={2} direction={'row'} columnSpacing={{ xs: 2, md: 5 }}>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom component="div">
              Created at: {formatDate(tour.createdAt)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" gutterBottom component="div">
              Last updated at: {formatDate(tour.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
        {!isOffline() &&
            <>
                <Grid container mb={2} direction={'row'} spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
                            Categories
                        </Typography>
                        <CategoryList tourCategories={tour.categories} type={FormType.DETAIL}/>
                    </Grid>
                </Grid>
                <MapWrapper>
                    <FullScreenControl/>
                  {!tour.gpxFile &&
                      <WayPointMarkerLayer features={getWayPointMarkerFeatures()}/>
                  }
                    <GpxDataLayer gpxFile={tour.gpxFile!}/>
                    <GpsImageMarkerLayer features={geoReferencedImages}/>
                </MapWrapper>
            </>
        }
        {!isOffline() && tour.gpxFile &&
            <Grid container mb={3} mt={2} direction={'column'}>
                <Grid item>
                    <Typography variant="h5" gutterBottom component="div">
                        Uploaded GPX File
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom component="div">
                        Click on the filename to download it.
                    </Typography>
                </Grid>
                <Grid item>
                    <MuiLink underline="none" color="primary"
                             href={getCloudStorageUrlForIdentifier(tour.gpxFile.identifier)}>
                        <DescriptionIcon sx={{ verticalAlign: 'bottom' }}/> <span
                        className="gpx-file-name">{tour.gpxFile.name}</span>
                    </MuiLink>
                </Grid>
            </Grid>
        }
        <Grid container mb={2} mt={2} direction={'column'}>
          <Grid item>
            <Typography variant="h5" gutterBottom component="div">
              Tour description
            </Typography>
          </Grid>
          <Grid item>
            <MarkdownElement value={tour.description}/>
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
        <DeleteConfirmation handleDelete={handleDelete}/>
      </DeleteEntryProvider>
    </>
  )
}

export default TourDetail

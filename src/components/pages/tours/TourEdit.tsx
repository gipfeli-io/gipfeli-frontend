import Typography from '@mui/material/Typography'
import { BaseTour, Tour, UpdateOrCreateTour } from '../../../types/tour'
import TourForm from '../../../components/app/TourForm'
import ToursService from '../../../services/tours/tours-service'
import { handleSave } from '../../../types/handle-save'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../../shared/Loader'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import { OfflineBoltOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import ImageUploadContext from '../../shared/images/upload/image-upload-context'
import { ImageUploadContextType } from '../../../types/contexts'
import { ImageUpload } from '../../../types/media'
import MediaService from '../../../services/media/media-service'
import useHandleImageUpload from '../../../hooks/use-handle-image-upload'
import { TourStatusType } from '../../../enums/tour-status-type'
import ToursSyncService from '../../../services/tours/tours-sync-service'
import useConnectionStatus from '../../../hooks/use-connection-status'
import LocalDatabaseService from '../../../services/local-database-service'

const EditTour = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const auth = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const [tour, setTour] = useState<BaseTour | undefined>(undefined)
  const toursService = new ToursService(auth.token)
  const mediaService = new MediaService(auth.token)
  const toursSyncService = new ToursSyncService(auth.token)
  const throwError = useApiError()
  const [images, setImages] = useState<ImageUpload[]>([])
  const { handleImageUpload, currentUploads } = useHandleImageUpload(mediaService, images, setImages)
  const { isOffline } = useConnectionStatus()
  const localDatabaseService = new LocalDatabaseService(auth.token)

  useEffect(() => {
    const setResult = (fetchedTour: Tour) => {
      const { description, endLocation, startLocation, name, userId, status, images: imageList } = fetchedTour
      setTour({ description, endLocation, startLocation, name, userId, status, images: [] })
      if (!isOffline()) {
        setImages(imageList)
      }
    }
    async function fetchTour () {
      const localTour = await localDatabaseService.getOne(id)
      if (isOffline() || localTour?.status === TourStatusType.CREATED) {
        if (localTour) {
          setResult(localTour)
        } else {
          throwError(localDatabaseService.getTourNotFoundResponse())
        }
      } else {
        const data = await toursService.findOne(id)
        if (data.success) {
          setResult(data.content!)
        } else {
          throwError(data)
        }
      }
    }

    fetchTour()
  }, [])

  const triggerSuccess = () => {
    triggerSuccessNotification('Successfully updated tour!')
    navigate(`/tours/${id}`)
  }

  const updateTour: handleSave<BaseTour> = async (baseTour: BaseTour) => {
    const tourToSave: UpdateOrCreateTour = {
      name: baseTour.name,
      startLocation: baseTour.startLocation,
      endLocation: baseTour.endLocation,
      description: baseTour.description,
      images
    }
    let data
    if (isOffline()) {
      const result = await localDatabaseService.update(id, tourToSave, TourStatusType.UPDATED)
      if (result) {
        triggerSuccess()
      } else {
        const errorResponse = localDatabaseService.getErrorResponse(false, 500, 'Could not edit local tour')
        throwError(errorResponse)
      }
    } else {
      if (baseTour.status === TourStatusType.CREATED) {
        data = await toursSyncService.synchronizeCreatedTour(id, tourToSave)
        id = data.content!.id
      } else {
        data = await toursService.update(id, tourToSave)
      }

      if (data.success) {
        triggerSuccess()
      } else {
        throwError(data)
      }
    }
  }

  const removeItem = useCallback((tourId: string) => {
    setImages(prevState => prevState.filter((element) => element.id !== tourId))
  }, [images])

  const imageContextProps: ImageUploadContextType = {
    save: handleImageUpload,
    files: images,
    remove: removeItem,
    currentUploads
  }

  if (!tour) {
    return (<Loader/>)
  } else {
    const getFormType = (): string => {
      return tour.status === TourStatusType.CREATED ? 'Create' : 'Edit'
    }

    return (
      <>
        <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
          Edit Tour
          { tour.status !== TourStatusType.SYNCED &&
              <span title={'This tour is not synchronized with the database.'}><OfflineBoltOutlined color={'warning'} sx={{ ml: 2 }}/></span>}
          <Button onClick={() => handleImageUpload([])}/>
        </Typography>
        <ImageUploadContext.Provider value={imageContextProps}>
          <TourForm tour={tour} saveHandler={updateTour} type={getFormType()}/>
        </ImageUploadContext.Provider>
      </>
    )
  }
}

export default EditTour

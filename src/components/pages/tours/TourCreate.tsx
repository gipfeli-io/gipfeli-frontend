import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import ToursService from '../../../services/tours/tours-service'
import React, { useCallback, useState } from 'react'
import { BaseTour, UpdateOrCreateTour } from '../../../types/tour'
import { handleSave } from '../../../types/handle-save'
import Typography from '@mui/material/Typography'
import TourForm from '../../app/TourForm'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import MediaService from '../../../services/media/media-service'
import { ImageUpload } from '../../../types/media'
import { ImageUploadContextType } from '../../../types/contexts'
import ImageUploadContext from '../../shared/images/upload/image-upload-context'
import useHandleImageUpload from '../../../hooks/use-handle-image-upload'

const TourCreate = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { triggerSuccessNotification } = useNotifications()
  const toursService = new ToursService(auth.token)
  const mediaService = new MediaService(auth.token)
  const throwError = useApiError()
  const [images, setImages] = useState<ImageUpload[]>([])
  const handleImageUpload = useHandleImageUpload(mediaService, images, setImages)

  const tour: BaseTour = new BaseTour('', { // Todo: make empty and add points in edit
    type: 'Point',
    coordinates: []
  }, {
    type: 'Point',
    coordinates: []
  }, '')

  const saveTour: handleSave<BaseTour> = async (baseTour: BaseTour) => {
    const tourToSave: UpdateOrCreateTour = {
      name: baseTour.name,
      startLocation: baseTour.startLocation,
      endLocation: baseTour.endLocation,
      description: baseTour.description,
      images
    }
    const data = await toursService.create(tourToSave) // todo: handle errors
    if (data.success) {
      triggerSuccessNotification('Created new tour!')
      navigate(`/tours/${data.content!.id}`)
    } else {
      throwError(data)
    }
  }

  const removeItem = useCallback((id: string) => {
    setImages(prevState => prevState.filter((element) => element.id !== id))
  }, [images])

  const imageContextProps: ImageUploadContextType = {
    save: handleImageUpload,
    files: images,
    remove: removeItem
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Create Tour
      </Typography>
      <ImageUploadContext.Provider value={imageContextProps}>
        <TourForm tour={tour} saveHandler={saveTour} type={'Create'}/>
      </ImageUploadContext.Provider>
    </>
  )
}

export default TourCreate

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

const TourCreate = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { triggerSuccessNotification } = useNotifications()
  const toursService = new ToursService(auth.token)
  const mediaService = new MediaService(auth.token)
  const throwError = useApiError()
  const [images, setImages] = useState<ImageUpload[]>([])

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

  const handleImageUpload: handleSave<File[]> = useCallback(
    async (uploadedImages: File[]) => {
      for (const uploadedImage of uploadedImages) {
        const data = await mediaService.uploadImage(uploadedImage)

        if (data.success) {
          setImages(prevState => [...prevState, data.content!])
        }
      }
    }, [images])

  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Create Tour
      </Typography>
      <TourForm tour={tour} saveHandler={saveTour} handleImageUpload={handleImageUpload} type={'Create'}/>
    </>
  )
}

export default TourCreate

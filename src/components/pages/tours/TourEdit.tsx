import Typography from '@mui/material/Typography'
import { BaseTour, UpdateOrCreateTour } from '../../../types/tour'
import TourForm from '../../../components/app/TourForm'
import ToursService from '../../../services/tours/tours-service'
import { handleSave } from '../../../types/handle-save'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../../shared/Loader'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import { Button } from '@mui/material'
import ImageUploadContext from '../../shared/images/upload/image-upload-context'
import { ImageUploadContextType } from '../../../types/contexts'
import { ImageUpload } from '../../../types/media'
import MediaService from '../../../services/media/media-service'

const EditTour = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const { triggerSuccessNotification } = useNotifications()
  const [tour, setTour] = useState<BaseTour | undefined>(undefined)
  const service = new ToursService(auth.token)
  const mediaService = new MediaService(auth.token)
  const throwError = useApiError()
  const [images, setImages] = useState<ImageUpload[]>([])

  useEffect(() => {
    async function fetchTour () {
      const data = await service.findOne(id!)
      if (data.success) {
        const { description, endLocation, startLocation, name, isSynced, isDeleted, images } = data.content!
        setTour({ description, endLocation, startLocation, name, isSynced, isDeleted, images: [] })
        setImages(images)
      } else {
        throwError(data)
      }
    }

    fetchTour()
  }, [])

  const updateTour: handleSave<BaseTour> = async (baseTour: BaseTour) => {
    const tourToSave: UpdateOrCreateTour = {
      name: baseTour.name,
      startLocation: baseTour.startLocation,
      endLocation: baseTour.endLocation,
      description: baseTour.description,
      images
    }
    const data = await service.update(id!, tourToSave)
    if (data.success) {
      triggerSuccessNotification('Successfully updated tour!')
      navigate(`/tours/${id}`)
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
        } else {
          throwError(data, false)
        }
      }
    }, [images])

  const removeItem = useCallback((id: string) => {
    setImages(prevState => prevState.filter((element) => element.id !== id))
  }, [images])

  const imageContextProps: ImageUploadContextType = {
    save: handleImageUpload,
    files: images,
    remove: removeItem
  }

  if (!tour) {
    return (<Loader/>)
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        Edit Tour
        <Button onClick={() => handleImageUpload([])}></Button>
      </Typography>
      <ImageUploadContext.Provider value={imageContextProps}>
        <TourForm tour={tour} saveHandler={updateTour} type={'Edit'}/>
      </ImageUploadContext.Provider>
    </>
  )
}

export default EditTour

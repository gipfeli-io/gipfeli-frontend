import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/use-auth'
import ToursService from '../../../services/tours/tours-service'
import React, { useCallback, useEffect, useState } from 'react'
import { BaseTour, UpdateOrCreateTour } from '../../../types/tour'
import { handleSave } from '../../../types/handle-save'
import Typography from '@mui/material/Typography'
import TourForm from '../../app/TourForm'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import MediaService from '../../../services/media/media-service'
import { GpxFileUpload, ImageUpload } from '../../../types/media'
import { GpxFileUploadContextType, ImageUploadContextType } from '../../../types/contexts'
import ImageUploadContext from '../../../contexts/image-upload-context'
import useHandleImageUpload from '../../../hooks/use-handle-image-upload'
import useConnectionStatus from '../../../hooks/use-connection-status'
import LocalDatabaseService from '../../../services/local-database-service'
import useCheckConnection from '../../../hooks/use-check-connection'
import useFormErrors from '../../../hooks/use-form-errors'
import useErrorHandling from '../../../hooks/use-error-handling'
import useHandleGpxFileUpload from '../../../hooks/use-handle-gpx-file-upload'
import GpxFileUploadContext from '../../../contexts/gpx-file-upload-context'
import { FormType } from '../../../enums/form-type'

const TourCreate = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { isOffline } = useConnectionStatus()
  const { triggerSuccessNotification } = useNotifications()
  const toursService = new ToursService(auth.token)
  const mediaService = new MediaService(auth.token)
  const throwError = useApiError()
  const [images, setImages] = useState<ImageUpload[]>([])
  const { handleImageUpload, currentUploads } = useHandleImageUpload(mediaService, images, setImages)
  const [gpxFile, setGpxFile] = useState<GpxFileUpload|undefined>(undefined)
  const { handleGpxFileUpload, currentGpxUpload } = useHandleGpxFileUpload(mediaService, gpxFile, setGpxFile)
  const checkConnection = useCheckConnection()
  const { triggerError } = useErrorHandling()
  const localDatabaseService = new LocalDatabaseService(auth.token)
  const { setFormErrorContainer, formErrors } = useFormErrors()

  useEffect(() => {
    if (!isOffline()) {
      checkConnection()
    }
  }, [])

  const tour: BaseTour = new BaseTour()

  const triggerSuccess = (id: string) => {
    triggerSuccessNotification('Created new tour!')
    navigate(`/tours/${id}`)
  }

  const saveTour: handleSave<BaseTour> = async (baseTour: BaseTour) => {
    try {
      const tourToSave: UpdateOrCreateTour = {
        name: baseTour.name.trim(),
        startLocation: baseTour.startLocation,
        endLocation: baseTour.endLocation,
        description: baseTour.description.trim(),
        categories: baseTour.categories,
        images,
        gpxFile
      }

      if (isOffline()) {
        const result = await localDatabaseService.create(tourToSave)
        if (result) {
          triggerSuccess(result.toString())
        } else {
          const errorResponse = localDatabaseService.getErrorResponse(false, 500, `Could not create local tour. ${result}`)
          throwError(errorResponse)
        }
      } else {
        const data = await toursService.create(tourToSave)
        if (data.success) {
          triggerSuccess(data.content!.id)
        } else {
          throwError(data, false)
          setFormErrorContainer(data)
        }
      }
    } catch (error: unknown) {
      triggerError(error as Error)
    }
  }

  const removeImage = useCallback((id: string) => {
    setImages(prevState => prevState.filter((element) => element.id !== id))
  }, [images])

  const imageContextProps: ImageUploadContextType = {
    save: handleImageUpload,
    files: images,
    remove: removeImage,
    currentUploads
  }

  const removeGpxFile = useCallback(() => {
    setGpxFile(undefined)
  }, [gpxFile])

  const gpxFileContextProps: GpxFileUploadContextType = {
    save: handleGpxFileUpload,
    file: gpxFile,
    remove: removeGpxFile,
    currentUpload: currentGpxUpload
  }

  return (
    <>
      <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
        Create Tour
      </Typography>
      <ImageUploadContext.Provider value={imageContextProps}>
        <GpxFileUploadContext.Provider value={gpxFileContextProps}>
          <TourForm tour={tour} saveHandler={saveTour} formErrors={formErrors} type={FormType.CREATE}/>
        </GpxFileUploadContext.Provider>
      </ImageUploadContext.Provider>
    </>
  )
}

export default TourCreate

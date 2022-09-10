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
import ImageUploadContext from '../../../contexts/image-upload-context'
import { GpxFileUploadContextType, ImageUploadContextType } from '../../../types/contexts'
import { GpxFileUpload, ImageUpload } from '../../../types/media'
import MediaService from '../../../services/media/media-service'
import useHandleImageUpload from '../../../hooks/use-handle-image-upload'
import { TourStatusType } from '../../../enums/tour-status-type'
import ToursSyncService from '../../../services/tours/tours-sync-service'
import useConnectionStatus from '../../../hooks/use-connection-status'
import LocalDatabaseService from '../../../services/local-database-service'
import useErrorHandling from '../../../hooks/use-error-handling'
import useFormErrors from '../../../hooks/use-form-errors'
import useHandleGpxFileUpload from '../../../hooks/use-handle-gpx-file-upload'
import GpxFileUploadContext from '../../../contexts/gpx-file-upload-context'
import { FormType } from '../../../enums/form-type'

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
  const [gpxFile, setGpxFile] = useState<GpxFileUpload|undefined>(undefined)
  const { handleGpxFileUpload, currentGpxUpload } = useHandleGpxFileUpload(mediaService, gpxFile, setGpxFile)
  const { isOffline } = useConnectionStatus()
  const { triggerError } = useErrorHandling()
  const localDatabaseService = new LocalDatabaseService(auth.token)
  const { setFormErrorContainer, formErrors } = useFormErrors()

  const setResult = (fetchedTour: Tour) => {
    const { description, endLocation, startLocation, name, userId, status, categories, images: imageList, gpxFile } = fetchedTour
    setTour({ description, endLocation, startLocation, name, userId, status, categories, images: [], gpxFile: undefined })
    if (!isOffline()) {
      setImages(imageList)
    }

    if (!isOffline()) {
      setGpxFile(gpxFile!)
    }
  }

  const setLocalData = (localTour: Tour|undefined): void => {
    if (localTour) {
      setResult(localTour)
    } else {
      throwError(localDatabaseService.getTourNotFoundResponse())
    }
  }

  const setRemoteData = async (): Promise<void> => {
    const data = await toursService.findOne(id)
    if (data.success) {
      setResult(data.content!)
    } else {
      throwError(data)
    }
  }

  useEffect(() => {
    async function fetchTour () {
      try {
        const localTour = await localDatabaseService.getOne(id)
        if (isOffline() || localTour?.status === TourStatusType.CREATED) {
          setLocalData(localTour)
        } else {
          await setRemoteData()
        }
      } catch (error: unknown) {
        triggerError(error as Error)
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
      name: baseTour.name.trim(),
      startLocation: baseTour.startLocation,
      endLocation: baseTour.endLocation,
      description: baseTour.description.trim(),
      categories: baseTour.categories,
      images,
      gpxFile
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
        id = data.success ? data.content!.id : undefined
      } else {
        data = await toursService.update(id, tourToSave)
      }
      if (data.success) {
        triggerSuccess()
      } else {
        throwError(data, false)
        setFormErrorContainer(data)
      }
    }
  }

  const removeImage = useCallback((tourId: string) => {
    setImages(prevState => prevState.filter((element) => element.id !== tourId))
  }, [images])

  const removeGpxFile = useCallback(() => {
    setGpxFile(undefined)
  }, [gpxFile])

  const imageContextProps: ImageUploadContextType = {
    save: handleImageUpload,
    files: images,
    remove: removeImage,
    currentUploads
  }

  const gpxFileContextProps: GpxFileUploadContextType = {
    save: handleGpxFileUpload,
    file: gpxFile,
    remove: removeGpxFile,
    currentUpload: currentGpxUpload
  }

  if (!tour) {
    return (<Loader/>)
  } else {
    const getFormType = (): FormType => {
      return tour.status === TourStatusType.CREATED ? FormType.CREATE : FormType.EDIT
    }

    return (
      <>
        <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
          Edit Tour
          { tour.status !== TourStatusType.SYNCED &&
              <span title={'This tour is not synchronized with the database.'}><OfflineBoltOutlined color={'warning'} sx={{ ml: 2 }}/></span>}
        </Typography>
        <ImageUploadContext.Provider value={imageContextProps}>
          <GpxFileUploadContext.Provider value={gpxFileContextProps}>
            <TourForm tour={tour} saveHandler={updateTour} formErrors={formErrors} type={getFormType()}/>
          </GpxFileUploadContext.Provider>
        </ImageUploadContext.Provider>
      </>
    )
  }
}

export default EditTour

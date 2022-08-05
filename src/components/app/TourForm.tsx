import { BaseTour, TourPoint } from '../../types/tour'
import { Alert, AlertTitle, Button, Grid, TextField } from '@mui/material'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { handleSave } from '../../types/handle-save'
import { useNavigate } from 'react-router'
import MapWrapper from '../shared/map/MapWrapper'
import WayPointMarkerLayer from '../shared/map/layers/WayPointMarkerLayer'
import FullScreenControl from '../shared/map/controls/FullScreenControl'
import ImageUpload from '../shared/images/upload/ImageUpload'
import useConnectionStatus from '../../hooks/use-connection-status'
import GpsImageMarkerLayer from '../shared/map/layers/GpsImageMarkerLayer'
import useImageUpload from '../../hooks/use-image-upload'
import { ValidationError } from '../../types/api'
import useFormErrors from '../../hooks/use-form-errors'
import GpxFileUpload from '../shared/gpx-files/upload/GpxFileUpload'

type TourFormProps = {
  tour: BaseTour
  saveHandler: handleSave<BaseTour>
  type: string,
  formErrors: ValidationError[]
}

export default function TourForm ({ tour, saveHandler, type, formErrors }: TourFormProps) {
  const navigate = useNavigate()
  const [currentTour, setCurrentTour] = useState(tour)
  const { isOffline } = useConnectionStatus()
  const { files } = useImageUpload()
  const { setOverrideFormErrors, hasErrors, getFieldErrors } = useFormErrors()

  useEffect(() => {
    setOverrideFormErrors(formErrors)
  }, [formErrors])

  const cancel = () => navigate(-1)

  const saveTour = async (event: any) => {
    event.preventDefault()
    // todo: perform validation
    saveHandler(currentTour)
  }

  const handleSetMarker = useCallback((coordinates: number[], id: number) => {
    if (id === 0) {
      setCurrentTour(prevTour => ({
        ...prevTour,
        startLocation: {
          type: 'Point',
          coordinates
        }
      })
      )
    } else {
      setCurrentTour(prevTour => ({
        ...prevTour,
        endLocation: {
          type: 'Point',
          coordinates
        }
      })
      )
    }
  }, [])

  return <form onSubmit={saveTour}>
    <Grid container spacing={4} direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
      <Grid item xs={12}>
        <TextField
          name="name"
          required
          fullWidth
          variant="standard"
          label="Tour Name"
          value={currentTour.name}
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setCurrentTour({ ...currentTour, name: event.target.value })}
          error={hasErrors('name')}
          helperText={getFieldErrors('name')}
        />
      </Grid>
      <Grid item xs={12}>
        {(hasErrors('startLocation') || hasErrors('endLocation')) &&
          <Alert severity={'error'} sx={{ mb: 2 }}>
            <AlertTitle>Map errors!</AlertTitle>
            {
              formErrors.map((error, index) => <li key={index}>{error.errors.join('; ')}</li>)
            }
          </Alert>
        }
        {!isOffline() &&
            <div id={'map'}>
                <MapWrapper>
                    <FullScreenControl/>
                    <WayPointMarkerLayer handleSetMarker={handleSetMarker}
                                         features={[new TourPoint(currentTour.startLocation), new TourPoint(currentTour.endLocation)]}
                                         type={type}/>
                    <GpsImageMarkerLayer features={files}/>
                </MapWrapper>
            </div>
        }
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          required
          fullWidth
          multiline
          rows={5}
          label="Tour Description"
          value={currentTour.description}
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setCurrentTour({ ...currentTour, description: event.target.value })}
          error={hasErrors('description')}
          helperText={getFieldErrors('description')}
        />
      </Grid>

      <Grid item xs={12}>
        {!isOffline() &&
            <div id={'image-gallery'}><ImageUpload/></div>
        }
      </Grid>
      <Grid item xs={12}>
        {!isOffline() &&
            <div id={'gpx-file-upload'}><GpxFileUpload/></div>
        }
      </Grid>
    </Grid>
    <Grid container spacing={2} mt={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
      <Grid item xs={12} sm={3}>
        <Button fullWidth variant="outlined" onClick={cancel}>Cancel</Button>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
      </Grid>
    </Grid>
  </form>
}

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
import GpxDataLayer from '../shared/map/layers/GpxDataLayer'
import useGpxFileUpload from '../../hooks/use-gpx-file-upload'
import Editor from '../shared/rich-text/Editor'
import Typography from '@mui/material/Typography'
import HelpTooltip from '../shared/HelpTooltip'
import CategoryList from './TourCategoryList'
import { TourCategory } from '../../types/tour-category'

type TourFormProps = {
  tour: BaseTour
  saveHandler: handleSave<BaseTour>
  type: string,
  formErrors: ValidationError[]
}

const MAP_HELPER_TEXT = 'Set a start and endpoint by clicking on the map. After setting them, they can be edited by dragging. Alternatively, you may upload a GPX file which replaces existing points and adds the track data to the map.'
const IMAGE_HELPER_TEXT = 'Add as many images as you like. If they have coordinates embedded, they will be display on the map itself.'

export default function TourForm ({ tour, saveHandler, type, formErrors }: TourFormProps) {
  const navigate = useNavigate()
  const [currentTour, setCurrentTour] = useState(tour)
  const { isOffline } = useConnectionStatus()
  const { files } = useImageUpload()
  const { file } = useGpxFileUpload()
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
  const handleSetCategories = useCallback((categories: TourCategory[]) => {
    setCurrentTour(prevTour => ({
      ...prevTour,
      categories
    }))
  }, [])

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
        <Typography variant="h5" component="div" gutterBottom sx={{ mb: 2 }}>
          Tour Categories
        </Typography>
        <CategoryList
          tourCategories={tour.categories}
          type={type}
          handleSetCategories={handleSetCategories}
          hasError={hasErrors('categories')}
        />
      </Grid>
      {!isOffline() &&
          <>
              <Grid item xs={12}>
                  <Typography variant="h5" component="div" gutterBottom>
                      Map data <HelpTooltip tooltip={MAP_HELPER_TEXT}/>
                  </Typography>
                {(hasErrors('startLocation') || hasErrors('endLocation')) &&
                    <Alert severity={'error'} sx={{ mb: 2 }}>
                        <AlertTitle>Map errors!</AlertTitle>
                      {
                        formErrors.map((error, index) => <li key={index}>{error.errors.join('; ')}</li>)
                      }
                    </Alert>
                }
                  <div id={'map'}>
                      <MapWrapper>
                          <FullScreenControl/>
                        {!file &&
                            <WayPointMarkerLayer handleSetMarker={handleSetMarker}
                                                 features={[new TourPoint(currentTour.startLocation), new TourPoint(currentTour.endLocation)]}
                                                 type={type}/>
                        }
                          <GpxDataLayer gpxFile={file!} handleSetMarker={handleSetMarker}/>
                          <GpsImageMarkerLayer features={files}/>
                      </MapWrapper>
                  </div>
              </Grid>
              <Grid item xs={12}>
                  <Typography variant="h6" component="div" gutterBottom>
                      GPX File (optional)
                  </Typography>
                  <div id={'gpx-file-upload'}><GpxFileUpload/></div>
              </Grid>
          </>
      }
      <Grid item xs={12}>
        <Typography variant="h5" component="div" gutterBottom>
          Tour description
        </Typography>
        <Editor
          name={'description'}
          initialContent={currentTour.description}
          error={hasErrors('description')}
          helperText={getFieldErrors('description')}
          onChange={(value) => setCurrentTour({ ...currentTour, description: value })}
        />
      </Grid>
      {!isOffline() &&
          <Grid item xs={12}>
              <Typography variant="h5" component="div" gutterBottom>
                  Images <HelpTooltip tooltip={IMAGE_HELPER_TEXT} />
              </Typography>
              <div id={'image-gallery'}><ImageUpload/></div>
          </Grid>
      }
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

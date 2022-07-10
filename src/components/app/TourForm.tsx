import { BaseTour, TourPoint } from '../../types/tour'
import { Button, Grid, TextField } from '@mui/material'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { handleSave } from '../../types/handle-save'
import { useNavigate } from 'react-router'
import MapWrapper from '../shared/map/MapWrapper'
import WayPointMarkerLayer from '../shared/map/layers/WayPointMarkerLayer'
import FullScreenControl from '../shared/map/controls/FullScreenControl'
import ImageUpload from '../shared/images/upload/ImageUpload'
import useOnlineStatus from '../../hooks/use-online-status'
import GpsImageMarkerLayer from '../shared/map/layers/GpsImageMarkerLayer'
import useImageUpload from '../../hooks/use-image-upload'
import Typography from '@mui/material/Typography'
import CameraIcon from '@mui/icons-material/PhotoCamera'

type TourFormProps = {
  tour: BaseTour
  saveHandler: handleSave<BaseTour>
  type: string
}

export default function TourForm ({ tour, saveHandler, type }: TourFormProps) {
  const navigate = useNavigate()
  const [currentTour, setCurrentTour] = useState(tour)
  const isOnline = useOnlineStatus()
  const { files } = useImageUpload()

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
        <TextField fullWidth
                   variant="standard"
                   label="Tour Name"
                   value={currentTour.name}
                   required
                   onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                     setCurrentTour({ ...currentTour, name: event.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        {isOnline &&
            <>
                <MapWrapper>
                    <FullScreenControl/>
                    <WayPointMarkerLayer handleSetMarker={handleSetMarker}
                                         features={[new TourPoint(currentTour.startLocation), new TourPoint(currentTour.endLocation)]} type={type}/>
                    <GpsImageMarkerLayer features={files} isEditable />
                </MapWrapper>
                <Typography variant="caption" component="div">
                    Hover over a <CameraIcon fontSize='inherit' sx={{ verticalAlign: 'middle' }}/> pin to show its image.
                </Typography>
            </>
        }
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth
                   multiline
                   rows={5}
                   label="Tour Description"
                   value={currentTour.description}
                   onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                     setCurrentTour({ ...currentTour, description: event.target.value })}/>
      </Grid>

      <Grid item xs={12}>
        {isOnline &&
            <ImageUpload/>
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

import {UpdateOrCreateTour} from '../../types/tour'
import {Button, Grid, TextField} from '@mui/material'
import React, {ChangeEvent, useState} from 'react'
import {useRouter} from 'next/router'
import {handleSave} from '../../types/handle-save'
import MapWrapper from "../shared/map/MapWrapper";
import FullScreenControl from '../shared/map/controls/FullScreenControl'
import WayPointMarkerLayer from "../shared/map/layers/WayPointMarkerLayer";

type formProps = {
    tour: UpdateOrCreateTour
    handleSave: handleSave<UpdateOrCreateTour>
    type: string
}

export default function TourForm({tour, handleSave, type}: formProps) {
    const router = useRouter();

    const saveTour = async (event: any) => {
        event.preventDefault()
        // todo: perform validation
        handleSave(currentTour)
    }

    const cancel = () => router.back()

    const [currentTour, setCurrentTour] = useState(tour)

    const handleSetMarker = (coordinates: number[], id: number): void => {
       if(id == 0){
            currentTour.startLocation = {
                'type': 'Point',
                'coordinates': coordinates }
            setCurrentTour({...currentTour})
        } else {
            currentTour.endLocation = {
                'type': 'Point',
                'coordinates': coordinates }
            setCurrentTour({...currentTour})
        }
    }

    return <>
        <form onSubmit={saveTour}>
            <Grid container spacing={4} direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                <Grid item xs={12}>
                    <TextField fullWidth
                               variant="standard"
                               label="Tour Name"
                               value={currentTour.name}
                               required
                               onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                   setCurrentTour({...currentTour, name: event.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MapWrapper >
                        <FullScreenControl />
                        <WayPointMarkerLayer handleSetMarker={handleSetMarker} features={[currentTour.startLocation, currentTour.endLocation]} type={type}/>
                    </MapWrapper>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               multiline
                               rows={5}
                               label="Tour Description"
                               value={currentTour.description}
                               onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                   setCurrentTour({...currentTour, description: event.target.value})}/>
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
    </>
}
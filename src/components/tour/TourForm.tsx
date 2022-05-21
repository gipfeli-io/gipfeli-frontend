import {Tour} from "../../types/tour";
import {Button, Grid, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/router";
import MapWrapper from "../shared/map/MapWrapper";

type formProps = {
    tour: Tour
}

export default function TourForm({tour}: formProps) {
    const router = useRouter();

    const saveTour = async (event: any) => {
        event.preventDefault()
        console.log('saveTour:', currentTour)
        //todo: call service to save tour
    }

    const cancel = () => router.back()

    const [currentTour, updateValue] = useState(tour)

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
                                   updateValue({...currentTour, name: event.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MapWrapper />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth
                               multiline
                               rows={5}
                               label="Tour Description"
                               value={currentTour.description}
                               onChange={(event:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                                   updateValue({...currentTour, description: event.target.value})}/>
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
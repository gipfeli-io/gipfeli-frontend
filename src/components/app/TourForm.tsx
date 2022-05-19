import {Tour} from "../../types/tour";
import {Button, Grid, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {generators} from "openid-client";
import {setState} from "jest-circus";

type formProps = {
    tour: Tour
}

export default function TourForm({tour}: formProps) { //todo: add enum for form type

    const saveTour = async (event: any) => {
        event.preventDefault();
        console.log('saveTour:', currentTour);
    }

    const [currentTour, updateValue] = useState(tour);

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
                    <Button fullWidth variant="outlined">Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    </>
}
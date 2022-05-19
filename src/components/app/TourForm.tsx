import {Tour} from "../../types/tour";
import {Button, Grid, TextField} from "@mui/material";

export default function TourForm(props: { tour: Tour }) { //todo: add enum for form type
    return <>
        <form action="" method="post">
            <Grid container spacing={4} direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                <Grid item xs={12}>
                    <TextField fullWidth variant="standard" label="Tour Name" value={props.tour.name}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={5} label="Tour Description" value={props.tour.description}/>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={12} sm={3}>
                    <Button fullWidth variant="outlined">Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button fullWidth variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    </>
}
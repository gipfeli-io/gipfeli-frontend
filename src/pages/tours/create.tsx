import AppPageLayout from "../../layouts/app-page-layout";
import Typography from "@mui/material/Typography";
import TourForm from "../../components/tour/TourForm";
import {Tour} from "../../types/tour";
import {Point} from 'geojson'
import dayjs from 'dayjs'

const NewTour = () => {
    const tour: Tour = new Tour("", "", {} as Point, {} as Point, "", dayjs(), dayjs())

    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Create Tour
            </Typography>
            <TourForm tour={tour} type={'Create'}/>
        </AppPageLayout>
    )
}

export default NewTour
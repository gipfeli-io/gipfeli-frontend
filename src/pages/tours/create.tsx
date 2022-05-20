import AppPageLayout from "../../layouts/app-page-layout";
import Typography from "@mui/material/Typography";
import TourForm from "../../components/app/TourForm";
import {Tour} from "../../types/tour";

const NewTour = () => {
    const tour: Tour = {} as Tour;
    return (
        <AppPageLayout>
            <Typography variant="h2" gutterBottom component="div">
                Create Tour
            </Typography>
            <TourForm tour={tour}/>
        </AppPageLayout>
    )
}

export default NewTour
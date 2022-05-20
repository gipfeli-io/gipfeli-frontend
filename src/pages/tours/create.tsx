import AppPageLayout from "../../layouts/app-page-layout";
import Typography from "@mui/material/Typography";
import TourForm from "../../components/app/TourForm";
import {Tour} from "../../types/tour";
import {Point} from 'geojson'
import {NextPageWithAuth} from '../../types/auth-extended-page'

const NewTour: NextPageWithAuth = () => {
    const tour: Tour = new Tour("", "", {} as Point, {} as Point, "", new Date(), new Date())

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
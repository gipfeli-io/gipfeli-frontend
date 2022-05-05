import {NextPage} from 'next'
import LandingPageLayout from '../../layouts/landing-page-layout'

const AppHome: NextPage = () => {
    return (
        <LandingPageLayout>
            <h1>Hello WOrld!</h1>
        </LandingPageLayout>

    )
}

export default AppHome

import Hero from '../components/landing-page/Hero'
import Features from '../components/landing-page/Features'
import {Container} from '@mui/material'
import LandingPageLayout from '../layouts/landing-page-layout'
import {NextPageWithAuth} from '../types/auth-extended-page'

const Home: NextPageWithAuth = () => {
    return (
        <LandingPageLayout>
            <Hero/>
            <Container maxWidth={'xl'}>
                <Features/>
            </Container>
        </LandingPageLayout>

    )
}

Home.isPublic = true

export default Home
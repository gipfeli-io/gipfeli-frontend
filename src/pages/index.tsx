import Hero from '../components/landing-page/Hero'
import Features from '../components/landing-page/Features'
import {Container} from '@mui/material'
import {NextPage} from 'next'
import LandingPageLayout from '../layouts/landing-page-layout'

const Home: NextPage = () => {
    return (
        <LandingPageLayout>
            <Hero/>
            <Container maxWidth={'xl'}>
                <Features/>
            </Container>
        </LandingPageLayout>

    )
}

export default Home

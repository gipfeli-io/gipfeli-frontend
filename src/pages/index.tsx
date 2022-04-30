import {NextPageWithLayout} from '../types/layout'
import landingPage from '../layouts/landing-page'
import Hero from '../components/landing-page/Hero'
import Features from '../components/landing-page/Features'
import {Container} from '@mui/material'

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Hero/>
            <Container maxWidth={'xl'}>
                <Features/>
            </Container>
        </>

    )
}

Home.getLayout = landingPage

export default Home

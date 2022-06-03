import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import LandingPageLayout from './layouts/landing-page-layout'
import Hero from '../landing-page/Hero'
import Features from '../landing-page/Features'
import React from 'react'
import dark from '../../themes/dark'

const Home = () => {
  return (
      <ThemeProvider theme={dark}>
        <CssBaseline/>
        <LandingPageLayout>
            <Hero/>
            <Container maxWidth={'xl'}>
                <Features/>
            </Container>
        </LandingPageLayout>
      </ThemeProvider>
  )
}

export default Home

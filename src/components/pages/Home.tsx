import { Container } from '@mui/material'
import Hero from '../landing-page/Hero'
import Features from '../landing-page/Features'
import React from 'react'

const Home = () => {
  return (
      <>
        <Hero/>
        <Container maxWidth={'xl'}>
            <Features/>
        </Container>
      </>
  )
}

export default Home

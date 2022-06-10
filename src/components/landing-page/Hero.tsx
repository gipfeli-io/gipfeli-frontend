import { Box, Button, Container, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

const Hero = () => {
  const triggerSentry = () => {
    throw new Error('Sentry works!')
  }

  return (
    <Box
      sx={{
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          align="center"
          gutterBottom
        >
          You&apos;ve arrived.
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Fellow hiker, you have arrived. <strong>gipfeli.io</strong> is the last hike documentation website you will
          ever need. So stop searching and join us!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Sign up</Button>
          <Button variant="outlined">Learn more</Button>
          <Button onClick={triggerSentry}>Break the world</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero

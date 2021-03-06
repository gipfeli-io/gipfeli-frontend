import { Box, Button, Container, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
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
          <Button component={Link} to="signup" variant="contained">Sign up</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero

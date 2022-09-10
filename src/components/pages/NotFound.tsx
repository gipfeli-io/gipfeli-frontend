import { Box, Button, Container, Stack } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Footer from '../shared/Footer'
import { ReactComponent as NotFoundIllustration } from '../../static/img/not-found/not_found.svg'

const NotFound = () => {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <NotFoundIllustration className="not-found-illustration" />
          <Typography
            variant="h1"
            align="center"
            gutterBottom
          >
            Uh-oh.
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            The page you requested could not be found.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            justifyContent="center"
          >
            <Button component={Link} to="/" variant="contained">Back to main</Button>
          </Stack>
          <Footer/>
      </Container>
    </Box>
  )
}

export default NotFound

import { Box, Container } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import Footer from '../shared/Footer'
import { ReactComponent as ServerErrorIllustration } from '../../static/img/server-error/server_error.svg'

type ServerErrorProps = {
  error?: Error
}

const ServerError = ({ error }: ServerErrorProps) => {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <ServerErrorIllustration className="not-found-illustration"/>
        <Typography
          variant="h1"
          align="center"
          gutterBottom
        >
          Uh-oh.
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          This should not happen. The error has been logged and will be investigated. Please try again later.
        </Typography>
        {error &&
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              {error.name}: {error.message}
            </Typography>
        }
        <Footer/>
      </Container>
    </Box>
  )
}

export default ServerError

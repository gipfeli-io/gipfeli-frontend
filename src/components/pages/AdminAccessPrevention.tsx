import { Box, Container } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import Copyright from '../shared/Copyright'
import { ReactComponent as AdminRequiredIllustration } from '../../static/img/admin-required/admin_required.svg'

const AdminAccessPrevention = () => {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 6
      }}
    >
      <Container maxWidth="sm">
        <AdminRequiredIllustration className="not-found-illustration" />
        <Typography
          variant="h1"
          align="center"
          gutterBottom
        >
          Gotcha!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          This page is meant for admins only. Your access request has been logged.
        </Typography>
        <Copyright/>
      </Container>
    </Box>
  )
}

export default AdminAccessPrevention

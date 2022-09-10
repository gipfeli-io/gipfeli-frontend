import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Link as MuiLink } from '@mui/material'

const Footer = () => (
  <Box sx={{ p: 6 }} component="footer">
    <Divider sx={{ mb: 2 }}/>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
      gutterBottom
    >
      <MuiLink component={Link} to={'/imprint'} color={'inherit'}>Imprint</MuiLink>
    </Typography>
    <Typography variant="subtitle1" align="center" gutterBottom>
      {'Powered by gipfeli.io '}
      {new Date().getFullYear()}
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Made with ☕, 🍺 and 🥐 in Switzerland.
    </Typography>
  </Box>
)

export default Footer

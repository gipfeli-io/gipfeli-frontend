import React from 'react'
import useAuth from '../../../hooks/use-auth'
import Typography from '@mui/material/Typography'
import { Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const NavBarUserSection = () => {
  const auth = useAuth()

  return <>
    <Stack direction={'row'} sx={{ flexGrow: 1 }} spacing={2}>
      <Typography variant="h6" component="div">
        gipfeli.io
      </Typography>
      {auth.email &&
          <Typography variant="body1" component="div">
              <Button component={Link} to="tours" variant="text" color="inherit">My Tours</Button>
          </Typography>
      }
    </Stack>

  </>
}

export default NavBarUserSection

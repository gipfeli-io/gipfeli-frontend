import React from 'react'
import useAuth from '../../hooks/use-auth'
import Typography from '@mui/material/Typography'
import { Link as MuiLink, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function NavBarUserSection () {
  const auth = useAuth()

  return <>
    <Stack direction={'row'} sx={{ flexGrow: 1 }} spacing={2}>
      <Typography variant="h6" component="div">
        gipfeli.io
      </Typography>
      {auth.username &&
          <Typography variant="h6" component="div">
              <MuiLink component={Link} to="tours">My Tours</MuiLink>
          </Typography>
      }
    </Stack>

  </>
}

export default NavBarUserSection

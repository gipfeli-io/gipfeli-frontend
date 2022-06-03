import { Button, Stack } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/use-auth'

function NavBarUserSection () {
  const isAuthenticated = false
  const auth = useAuth()

  if (!isAuthenticated) {
    return (
            <Stack spacing={2} direction={'row'}>
              {auth.username}
                <Button variant={'contained'} id={'join-button'}>Join</Button>
                <Link to={'login'}><Button variant={'outlined'} >Login</Button></Link>
            </Stack>
    )
  }

  return (
        <Stack spacing={2} direction={'row'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello, !
            </Typography>
            <Button variant={'outlined'} id={'logout-button'}>Logout</Button>
        </Stack>
  )
}

export default NavBarUserSection

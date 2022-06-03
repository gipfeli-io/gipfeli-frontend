import { Button, Stack } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'

function NavBarUserSection () {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return (
            <Stack spacing={2} direction={'row'}>
                <Button variant={'contained'} id={'join-button'}>Join</Button>
                <Button variant={'outlined'}>Login</Button>
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

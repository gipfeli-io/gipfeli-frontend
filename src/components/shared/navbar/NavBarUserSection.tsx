import { Button, Stack } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/use-auth'
import { useNavigate } from 'react-router'
import ThemeSwitcher from './ThemeSwitcher'

function NavBarUserSection () {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.username) {
    return (
      <Stack spacing={2} direction={'row'}>
        <Button variant={'contained'} id={'join-button'}>Join</Button>
        <Link to={'login'}><Button variant={'outlined'}>Login</Button></Link>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction={'row'}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Hello, {auth.username}!
      </Typography>
      <Button variant={'outlined'} id={'logout-button'}
              onClick={() => auth.signOut(() => navigate('/login'))}>Logout</Button>
      <ThemeSwitcher/>
    </Stack>
  )
}

export default NavBarUserSection
import { Button, IconButton, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/use-auth'
import { useNavigate } from 'react-router'
import ThemeSwitcher from './ThemeSwitcher'
import LogoutIcon from '@mui/icons-material/Logout'

const NavBarUserSection = () => {
  const { email, signOut } = useAuth()
  const navigate = useNavigate()

  if (!email) {
    return (
      <Stack spacing={2} direction={'row'}>
        <Button component={Link} to="signup" variant={'contained'} id={'join-button'}>Join</Button>
        <Button component={Link} to="login" variant={'outlined'} color="inherit">Login</Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction={'row'}>
      <ThemeSwitcher/>
      <IconButton onClick={() => signOut(() => navigate('/login'))} color="inherit" title="switch theme">
        <LogoutIcon/>
      </IconButton>
    </Stack>
  )
}

export default NavBarUserSection

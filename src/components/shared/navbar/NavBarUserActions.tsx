import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/use-auth'
import { useNavigate } from 'react-router'
import ThemeSwitcher from './ThemeSwitcher'
import LogoutIcon from '@mui/icons-material/Logout'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import LoginIcon from '@mui/icons-material/Login'

const NavBarUserActions = () => {
  const { email, signOut } = useAuth()
  const navigate = useNavigate()

  if (!email) {
    return (
      <Stack spacing={2} direction={'row'}>
        <Tooltip title={'Create a free account'}>
          <IconButton color="inherit" component={Link} to="signup" id={'join-button'}>
            <MeetingRoomIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title={'Login'}>
          <IconButton color="inherit" component={Link} to="login" id={'login-button'}>
            <LoginIcon/>
          </IconButton>
        </Tooltip>
        <ThemeSwitcher/>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction={'row'}>
      <Tooltip title={`Logout ${email}`}>
        <IconButton onClick={() => signOut(() => navigate('/login'))} color="inherit" id={'logout-button'}>
          <LogoutIcon/>
        </IconButton>
      </Tooltip>
      <ThemeSwitcher/>
    </Stack>
  )
}

export default NavBarUserActions

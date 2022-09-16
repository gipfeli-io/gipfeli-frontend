import { Stack, Tooltip } from '@mui/material'
import React from 'react'
import useAuth from '../../../hooks/use-auth'
import { useNavigate } from 'react-router'
import ThemeSwitcher from './ThemeSwitcher'
import Button from '@mui/material/Button'

const NavBarUserActions = () => {
  const { email, signOut } = useAuth()
  const navigate = useNavigate()

  if (!email) {
    return (
      <Stack spacing={2} direction={'row'}>
        <Tooltip title={'Login'}>
          <Button color='inherit' variant='outlined' onClick={() => navigate('/login')} id={'login-button'}>
            Login
          </Button>
        </Tooltip>
        <ThemeSwitcher/>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction={'row'}>
      <Tooltip title={`Logout ${email}`}>
        <Button color='inherit' variant='outlined' onClick={() => signOut(() => navigate('/login'))} id={'logout-button'}>
          Logout
        </Button>
      </Tooltip>
      <ThemeSwitcher/>
    </Stack>
  )
}

export default NavBarUserActions

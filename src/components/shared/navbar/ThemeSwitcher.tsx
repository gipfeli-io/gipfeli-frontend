import useTheme from '../../../hooks/use-theme'
import { IconButton } from '@mui/material'
import DarkMode from '../../../themes/DarkMode'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import React from 'react'

const ThemeSwitcher = () => {
  const { activeTheme, toggleTheme } = useTheme()

  return (
    <IconButton sx={{ mr: 2 }} onClick={toggleTheme} color="inherit" title="switch theme">
      {activeTheme.name === DarkMode.name ? <Brightness7Icon/> : <Brightness4Icon/>}
    </IconButton>
  )
}

export default ThemeSwitcher

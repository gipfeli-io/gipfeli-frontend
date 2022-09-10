import useTheme from '../../../hooks/use-theme'
import { IconButton, Tooltip } from '@mui/material'
import DarkMode from '../../../themes/dark-mode'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import React from 'react'

const ThemeSwitcher = () => {
  const { activeTheme, toggleTheme } = useTheme()

  return (
    <Tooltip title="Toggle theme">
      <IconButton onClick={toggleTheme} color="inherit" id={'theme-switcher'}>
        {activeTheme.name === DarkMode.name ? <Brightness7Icon/> : <Brightness4Icon/>}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeSwitcher

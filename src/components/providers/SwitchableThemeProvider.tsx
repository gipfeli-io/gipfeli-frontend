import React, { useState } from 'react'
import { ThemeContext, ThemeContextType } from '../../contexts/ThemeContext'
import { LocalStorageKey } from '../../enums/LocalStorageKey'
import { AppTheme } from '../../types/theme'
import LightMode from '../../themes/LightMode'
import DarkMode from '../../themes/DarkMode'
import { CssBaseline, ThemeProvider } from '@mui/material'

const SwitchableThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const setLocalStorageAndReturnTheme = (theme: AppTheme): AppTheme => {
    localStorage.setItem(LocalStorageKey.ActiveStyle, theme.name)

    return theme
  }

  const getThemeToActivate = (theme: string): AppTheme => {
    return theme === LocalStorageKey.DarkMode ? setLocalStorageAndReturnTheme(LightMode) : setLocalStorageAndReturnTheme(DarkMode)
  }
  const getInitialTheme = () => {
    return LightMode
  }
  const [activeTheme, setActiveTheme] = useState<AppTheme>(getInitialTheme())

  const toggleTheme = () => {
    const newTheme = getThemeToActivate(activeTheme.name)
    setActiveTheme(newTheme)
  }

  const value: ThemeContextType = { activeTheme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={activeTheme.theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default SwitchableThemeProvider

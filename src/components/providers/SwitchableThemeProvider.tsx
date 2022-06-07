import React, { useEffect, useState } from 'react'
import { ThemeContext, ThemeContextType } from '../../contexts/theme-context'
import { LocalStorageKey } from '../../enums/local-storage-key'
import { AppTheme } from '../../types/theme'
import LightMode from '../../themes/light-mode'
import DarkMode from '../../themes/dark-mode'
import { CssBaseline, ThemeProvider } from '@mui/material'
import LocalStorageService from '../../services/local-storage-service'

const SwitchableThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageService: LocalStorageService = new LocalStorageService()

  const getThemeToActivate = (theme: string): AppTheme => {
    return theme === LocalStorageKey.DarkMode ? LightMode : DarkMode
  }

  const getInitialTheme = () => {
    const savedThemeChoice = localStorageService.getItem(LocalStorageKey.ActiveStyle)
    if (savedThemeChoice) {
      return savedThemeChoice === LocalStorageKey.DarkMode ? DarkMode : LightMode
    }

    return LightMode
  }

  const [activeTheme, setActiveTheme] = useState<AppTheme>(getInitialTheme())

  const toggleTheme = () => {
    const newTheme = getThemeToActivate(activeTheme.name)
    setActiveTheme(newTheme)
  }

  useEffect(() => {
    localStorageService.addItem(LocalStorageKey.ActiveStyle, activeTheme.name)
  }, [activeTheme])

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

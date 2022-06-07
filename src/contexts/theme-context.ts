import React from 'react'
import { AppTheme } from '../types/theme'

export interface ThemeContextType {
  activeTheme: AppTheme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>(null!)

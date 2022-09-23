import React from 'react'
import { ThemeContextType } from '../types/contexts'

/**
 * The context interface (NotificationContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/SwitchableThemeProvider.tsx, which provides functionality to
 * switch between the dark and the light theme.
 *
 * We provide the hook src/hooks/use-theme, so you can easily re-use all the functionality in your components.
 */
export const ThemeContext = React.createContext<ThemeContextType>(null!)

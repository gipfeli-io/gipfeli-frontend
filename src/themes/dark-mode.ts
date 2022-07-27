import { createTheme } from '@mui/material/styles'
import { LocalStorageKey } from '../enums/local-storage-key'
import { AppTheme } from '../types/theme'
import type {} from '@mui/lab/themeAugmentation'
import { responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const DarkMode: AppTheme = {
  name: LocalStorageKey.DarkMode,
  theme: responsiveFontSizes(theme)
}

export default DarkMode

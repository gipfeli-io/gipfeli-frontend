import { createTheme } from '@mui/material/styles'
import { AppTheme } from '../types/theme'
import { LocalStorageKey } from '../enums/local-storage-key'
import type {} from '@mui/lab/themeAugmentation'
import { responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light'
  }
})

const LightMode: AppTheme = {
  name: LocalStorageKey.LightMode,
  theme: responsiveFontSizes(theme)
}

export default LightMode

import { createTheme } from '@mui/material/styles'
import { LocalStorageKey } from '../enums/local-storage-key'
import { AppTheme } from '../types/theme'
import type {} from '@mui/lab/themeAugmentation'

const DarkMode: AppTheme = {
  name: LocalStorageKey.DarkMode,
  theme: createTheme({
    palette: {
      mode: 'dark'
    }
  })
}

export default DarkMode

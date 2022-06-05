import { createTheme } from '@mui/material/styles'
import { LocalStorageKey } from '../enums/LocalStorageKey'
import { AppTheme } from '../types/theme'

const DarkMode: AppTheme = {
  name: LocalStorageKey.DarkMode,
  theme: createTheme({
    palette: {
      mode: 'dark'
    }
  })
}

export default DarkMode

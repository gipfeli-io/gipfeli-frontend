import { createTheme } from '@mui/material/styles'
import { LocalStorageKey } from '../enums/local-storage-key'
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

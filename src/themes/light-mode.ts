import { createTheme } from '@mui/material/styles'
import { AppTheme } from '../types/theme'
import { LocalStorageKey } from '../enums/local-storage-key'

const LightMode: AppTheme = {
  name: LocalStorageKey.LightMode,
  theme: createTheme({
    palette: {
      mode: 'light'
    }
  })
}

export default LightMode

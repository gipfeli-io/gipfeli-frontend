import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme-context'

const useTheme = () => useContext(ThemeContext)

export default useTheme

import ErrorBoundaryContext from '../contexts/error-boundary-context'
import { useContext } from 'react'

const useErrorHandling = () => useContext(ErrorBoundaryContext)

export default useErrorHandling

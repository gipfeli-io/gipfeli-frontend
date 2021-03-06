import React from 'react'
import { ErrorBoundaryContextType } from '../types/contexts'

// eslint-disable-next-line n/handle-callback-err
// const ErrorBoundaryContext = React.createContext((error: Error, errorInfo?: ErrorInfo): void => { /* template function */ })
const ErrorBoundaryContext = React.createContext<ErrorBoundaryContextType>(null!)

export default ErrorBoundaryContext

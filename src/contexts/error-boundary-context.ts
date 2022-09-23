import React from 'react'
import { ErrorBoundaryContextType } from '../types/contexts'

/**
 * The context interface (ErrorBoundaryContextType) can be found in type src/types/contexts.ts.
 *
 * The context is not implemented in a separate provider but in src/components/shared/ErrorBoundary.tsx as it needs
 * access to the objects in the error boundary component and has to set the component state directly.
 * The context is used to provide the possibility to use a try-catch block around an async function and correctly
 * throw the error as async functions are not automatically caught by the error boundary.
 *
 * We provide the hook src/hooks/use-error-handling, so you can easily re-use all the functionality in your components.
 */
// eslint-disable-next-line n/handle-callback-err
const ErrorBoundaryContext = React.createContext<ErrorBoundaryContextType>(null!)

export default ErrorBoundaryContext

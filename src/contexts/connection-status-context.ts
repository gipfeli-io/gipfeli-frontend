import React from 'react'
import { ConnectionStatusContextType } from '../types/contexts'

/**
 * The context interface (ConnectionStatusContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/ConnectionStatusProvider.tsx, which provides all the functionality
 * to handle the offline - online flow in the application. There are also some helpers you can use to check if the app is offline or not.
 *
 * We provide the hook src/hooks/use-connection-status, so you can easily re-use all the functionality in your components or services.
 */
const ConnectionStatusContext = React.createContext<ConnectionStatusContextType>(null!)

export default ConnectionStatusContext

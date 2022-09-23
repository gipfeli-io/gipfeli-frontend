import React from 'react'
import { DeleteEntryContextType } from '../types/contexts'

/**
 * The context interface (DeleteEntryContextType) can be found in type src/types/contexts.ts.
 *
 * The context is implemented in src/components/providers/DeleteEntryProvider.tsx, which provides the "delete confirmation" modal
 * we re-use throughout the app.
 *
 * We provide the hook src/hooks/use-delete-entry, so you can easily re-use all the functionality in your components.
 */
const DeleteEntryContext = React.createContext<DeleteEntryContextType>(null!)

export default DeleteEntryContext

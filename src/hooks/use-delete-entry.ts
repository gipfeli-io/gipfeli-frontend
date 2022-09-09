import { useContext } from 'react'
import DeleteEntryContext from '../contexts/delete-entry-context'

const useDeleteEntry = () => useContext(DeleteEntryContext)

export default useDeleteEntry

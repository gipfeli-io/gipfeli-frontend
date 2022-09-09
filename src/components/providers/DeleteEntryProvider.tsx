import React, { PropsWithChildren, useState } from 'react'
import { DeleteEntryContextType } from '../../types/contexts'
import DeleteEntryContext from '../../contexts/delete-entry-context'

type DeleteEntryProviderProps = {
  id?: string
}

const DeleteEntryProvider = ({ children, id }: PropsWithChildren<DeleteEntryProviderProps>) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined)

  const value: DeleteEntryContextType = {
    showDeleteModal,
    toggleModal: () => setShowDeleteModal(prevState => !prevState),
    deleteId: id ?? deleteId,
    setDeleteId: (id) => setDeleteId(id)
  }

  return (
    <DeleteEntryContext.Provider value={value}>
      {children}
    </DeleteEntryContext.Provider>
  )
}

export default DeleteEntryProvider

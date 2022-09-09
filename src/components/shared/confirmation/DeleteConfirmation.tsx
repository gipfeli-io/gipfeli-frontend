import React from 'react'
import Confirmation from './Confirmation'
import useDeleteEntry from '../../../hooks/use-delete-entry'

type DeleteConfirmationProps = {
  handleDelete: (id: string) => Promise<void>
}

const DeleteConfirmation = ({ handleDelete }: DeleteConfirmationProps) => {
  const { showDeleteModal, toggleModal, deleteId, setDeleteId } = useDeleteEntry()
  const title = 'Do you really want to delete this entry?'
  const content = 'Once an entry is deleted, there is no way of retrieving it any more - it is gone for good.'
  const acceptTitle = 'Yes, delete'

  const onAccept = async () => {
    if (deleteId) {
      await handleDelete(deleteId)
      setDeleteId(undefined)
    }

    toggleModal()
  }

  const onClose = () => {
    setDeleteId(undefined)
    toggleModal()
  }

  return <Confirmation title={title} content={content} open={showDeleteModal} onClose={onClose} onAccept={onAccept}
                       acceptTitle={acceptTitle}/>
}

export default DeleteConfirmation

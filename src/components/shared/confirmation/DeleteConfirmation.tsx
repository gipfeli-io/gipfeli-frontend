import React from 'react'
import Confirmation, { ConfirmationProps } from './Confirmation'

type ListDeleteConfirmationProps = Pick<ConfirmationProps, 'open' | 'onAccept' | 'onClose'>

const DeleteConfirmation = ({ open, onAccept, onClose }: ListDeleteConfirmationProps) => {
  const title = 'Do you really want to delete this entry?'
  const content = 'Once an entry is deleted, there is no way of retrieving it any more - it is gone for good.'
  const acceptTitle = 'Yes, delete'

  return <Confirmation title={title} content={content} open={open} onClose={onClose} onAccept={onAccept}
                       acceptTitle={acceptTitle}/>
}

export default DeleteConfirmation

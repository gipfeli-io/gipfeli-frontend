import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export type ConfirmationProps = {
  title: string;
  content: string;
  cancelTitle?: string;
  acceptTitle?: string;
  open: boolean,
  onClose: () => void,
  onAccept: () => Promise<void>
}

const Confirmation = ({
  title,
  content,
  cancelTitle = 'No, cancel',
  acceptTitle = 'Yes, accept',
  onAccept,
  onClose,
  open
}: ConfirmationProps) => {
  return <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title"
                 aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{cancelTitle}</Button>
      <Button onClick={onAccept} autoFocus>{acceptTitle}</Button>
    </DialogActions>
  </Dialog>
}

export default Confirmation

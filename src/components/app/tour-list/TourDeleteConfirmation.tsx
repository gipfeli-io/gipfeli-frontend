import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

type TourDeleteConfirmationProps = {
  open: boolean,
  onClose: () => void,
  onClick: () => Promise<void>
}

export function TourDeleteConfirmation ({ onClick, onClose, open }: TourDeleteConfirmationProps) {
  return <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {'Do you really want to delete this entry?'}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Once an entry is deleted, there is no way of retrieving it any more - it is gone for good.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>No, cancel</Button>
      <Button onClick={onClick} autoFocus>
        Yes, delete
      </Button>
    </DialogActions>
  </Dialog>
}

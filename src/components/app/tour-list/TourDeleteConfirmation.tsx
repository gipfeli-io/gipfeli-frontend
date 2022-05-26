import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

interface TourDeleteConfirmationProps {
    open: boolean,
    onClose: () => void,
    onClick: () => Promise<void>
}

export function TourDeleteConfirmation(props:TourDeleteConfirmationProps) {
    return <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {`Do you really want to delete this entry?`}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Once an entry is deleted, there is no way of retrieving it any more - it is gone for good.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>No, cancel</Button>
            <Button onClick={props.onClick} autoFocus>
                Yes, delete
            </Button>
        </DialogActions>
    </Dialog>
}
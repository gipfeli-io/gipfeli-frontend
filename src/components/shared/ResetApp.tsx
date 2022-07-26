import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import Confirmation from './confirmation/Confirmation'

const ResetApp = () => {
  const [open, setOpen] = useState<boolean>(false)
  const title = 'Do you really want to reset the application?'
  const content = 'All unsynchronized local changes will be lost and cannot be retrieved.'
  const acceptTitle = 'Yes, reset'
  const onClose = () => {
    console.log('closing')
    setOpen(false)
  }

  const onClick = async () => {
    console.log('deleting!')
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" startIcon={<AutoFixHighIcon/>} onClick={() => setOpen(true)}>
        Reset app
      </Button>
      <Confirmation title={title} content={content} open={open} onClose={() => onClose()} onAccept={() => onClick()} acceptTitle={acceptTitle}/>
    </>
  )
}

export default ResetApp

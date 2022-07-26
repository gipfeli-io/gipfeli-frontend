import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import Confirmation from './confirmation/Confirmation'
import LocalDatabaseService from '../../services/local-database-service'
import useNotifications from '../../hooks/use-notifications'
import * as serviceWorkerRegistration from '../../serviceWorkerRegistration'

const ResetApp = () => {
  const { triggerSuccessNotification } = useNotifications()
  const dbService = new LocalDatabaseService()
  const [open, setOpen] = useState<boolean>(false)
  const title = 'Do you really want to reset the application?'
  const content = 'All unsynchronized local changes will be lost and cannot be retrieved.'
  const acceptTitle = 'Yes, reset'

  const onClose = () => {
    setOpen(false)
  }

  const onAccept = async () => {
    await dbService.reset()
    serviceWorkerRegistration.unregister()
    serviceWorkerRegistration.register()
    triggerSuccessNotification('App was successfully reset!')
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" startIcon={<AutoFixHighIcon/>} onClick={() => setOpen(true)}>
        Reset app
      </Button>
      <Confirmation title={title} content={content} open={open} onClose={() => onClose()} onAccept={() => onAccept()} acceptTitle={acceptTitle}/>
    </>
  )
}

export default ResetApp

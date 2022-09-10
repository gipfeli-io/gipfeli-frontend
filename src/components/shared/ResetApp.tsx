import React, { useState } from 'react'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import Confirmation from './confirmation/Confirmation'
import LocalDatabaseService from '../../services/local-database-service'
import useNotifications from '../../hooks/use-notifications'
import { LoadingButton } from '@mui/lab'

const ResetApp = () => {
  const { triggerSuccessNotification } = useNotifications()
  const dbService = new LocalDatabaseService(undefined)
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const title = 'Do you really want to reset the application?'
  const content = 'All unsynchronized local changes will be lost and cannot be retrieved.'
  const acceptTitle = 'Yes, reset'

  const onClose = () => {
    setOpen(false)
  }

  const onAccept = async () => {
    setOpen(false)
    setLoading(true)
    await dbService.reset()
    triggerSuccessNotification('App was successfully reset!')
    setLoading(false)
  }

  return (
    <>
      <LoadingButton loading={loading} variant="contained" startIcon={<AutoFixHighIcon/>} onClick={() => setOpen(true)}>
        Reset app
      </LoadingButton>
      <Confirmation title={title} content={content} open={open} onClose={() => onClose()} onAccept={() => onAccept()} acceptTitle={acceptTitle}/>
    </>
  )
}

export default ResetApp

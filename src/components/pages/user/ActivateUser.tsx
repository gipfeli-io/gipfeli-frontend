import { useNavigate, useParams } from 'react-router'
import React, { useEffect } from 'react'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import AuthService from '../../../services/auth/auth-service'
import Loader from '../../shared/Loader'
import Typography from '@mui/material/Typography'

const ActivateUser = () => {
  const { userId, token } = useParams()
  const navigate = useNavigate()
  const { triggerSuccessNotification } = useNotifications()
  const service = new AuthService()
  const throwError = useApiError()

  useEffect(() => {
    async function activateUser () {
      const data = await service.activateUser(userId!, token!)
      if (data.success) {
        triggerSuccessNotification('Account activated - you may now signin!')
        navigate('/', { replace: true })
      } else {
        throwError(data)
        navigate('/', { replace: true })
      }
    }

    activateUser()
  }, [])

  return <>
    <Loader></Loader>
    <Typography component="h1" variant="h2">
      Activating user...
    </Typography>
  </>
}

export default ActivateUser

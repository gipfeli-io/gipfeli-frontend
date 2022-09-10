import { useNavigate, useParams } from 'react-router'
import React, { useEffect } from 'react'
import useNotifications from '../../../hooks/use-notifications'
import useApiError from '../../../hooks/use-api-error'
import AuthService from '../../../services/auth/auth-service'
import Loader from '../../shared/Loader'
import Typography from '@mui/material/Typography'

/**
 * React router v6 returns params as string | undefined. To avoid unnecessary type assertions (because we know that the
 * params are defined due to the way we handle our routing), we use a workaround.
 *
 * See https://stackoverflow.com/a/70000958 or https://stackoverflow.com/a/71146532
 */
type ActivateUserRouteParams = {
  userId: string
  token: string
}

const ActivateUser = () => {
  const { userId, token } = useParams<keyof ActivateUserRouteParams>() as ActivateUserRouteParams
  const navigate = useNavigate()
  const { triggerSuccessNotification } = useNotifications()
  const service = new AuthService()
  const throwError = useApiError()

  useEffect(() => {
    async function activateUser () {
      const data = await service.activateUser(userId, token)
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

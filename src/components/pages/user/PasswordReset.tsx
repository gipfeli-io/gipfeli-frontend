import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { FormEvent } from 'react'
import AuthService from '../../../services/auth/auth-service'
import useApiError from '../../../hooks/use-api-error'
import useNotifications from '../../../hooks/use-notifications'
import { useNavigate } from 'react-router'
import AuthFormLinks from '../../shared/AuthFormLinks'

const PasswordReset = () => {
  const authService = new AuthService()
  const throwError = useApiError()
  const { triggerSuccessNotification } = useNotifications()
  const navigate = useNavigate()

  const requestPasswordReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = await authService.requestPasswordReset(
      data.get('email')!.toString()
    )

    if (result.success) {
      triggerSuccessNotification('A password reset link has been sent to your email.')
      navigate('/')
    } else {
      throwError(result, false)
    }
  }

  return (
    <>
      <Typography component="h1" variant="h2">
        Reset Password
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={requestPasswordReset}>
        <Typography component="div" variant="body2">
          If you cannot remember your password, submit your email address and we will send you a link to reset your
          password. This link is valid for up to 2 hours.
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Request reset
        </Button>
        <AuthFormLinks type={'passwordReset'}/>
      </Box>
    </>
  )
}

export default PasswordReset

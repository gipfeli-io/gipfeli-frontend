import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { FormEvent } from 'react'
import AuthService from '../../../services/auth/auth-service'
import useApiError from '../../../hooks/use-api-error'
import useNotifications from '../../../hooks/use-notifications'
import { useNavigate, useParams } from 'react-router'
import AuthFormLinks from '../../shared/AuthFormLinks'
import useFormErrors from '../../../hooks/use-form-errors'

const SetNewPassword = () => {
  const { userId, token } = useParams()
  const authService = new AuthService()
  const throwError = useApiError()
  const { triggerSuccessNotification } = useNotifications()
  const navigate = useNavigate()
  const { setFormErrorContainer, hasErrors, getFieldErrors } = useFormErrors()

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = await authService.performPasswordReset(
      userId!,
      token!,
      data.get('password')!.toString(),
      data.get('passwordConfirmation')!.toString()
    )

    if (result.success) {
      triggerSuccessNotification('Password has been set, you may now log in.')
      navigate('/')
    } else {
      throwError(result, false)
      setFormErrorContainer(result)
    }
  }

  return (
    <>
      <Typography component="h1" variant="h2">
        Set new Password
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={resetPassword}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          error={hasErrors('password')}
          helperText={getFieldErrors('password')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Confirm new password"
          type="password"
          id="passwordConfirmation"
          error={hasErrors('passwordConfirmation')}
          helperText={getFieldErrors('passwordConfirmation')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset password
        </Button>
        <AuthFormLinks type={'passwordReset'}/>
      </Box>
    </>
  )
}

export default SetNewPassword

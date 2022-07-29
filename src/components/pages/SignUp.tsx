import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import React, { FormEvent } from 'react'
import AuthService from '../../services/auth/auth-service'
import useApiError from '../../hooks/use-api-error'
import useNotifications from '../../hooks/use-notifications'
import { useNavigate } from 'react-router'
import AuthFormLinks from '../shared/AuthFormLinks'
import useFormErrors from '../../hooks/use-form-errors'

const SignUp = () => {
  const authService = new AuthService()
  const throwError = useApiError()
  const { triggerSuccessNotification } = useNotifications()
  const navigate = useNavigate()
  const { setFormErrorContainer, hasErrors, getFieldErrors } = useFormErrors()

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // todo: validation
    const result = await authService.signUp(
      data.get('email')!.toString(),
      data.get('firstName')!.toString(),
      data.get('lastName')!.toString(),
      data.get('password')!.toString(),
      data.get('passwordConfirmation')!.toString()
    )

    if (result.success) {
      triggerSuccessNotification('Created new account. Check your email to activate your account.')
      navigate('/')
    } else {
      throwError(result, false)
      setFormErrorContainer(result)
    }
  }

  return (
    <>
      <Typography component="h1" variant="h2">
        Sign up
      </Typography>

      <Box component="form" sx={{ mt: 1 }} onSubmit={signUp}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={hasErrors('email')}
              helperText={getFieldErrors('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="normal"
              id="firstName"
              label="First Name"
              name="firstName"
              fullWidth
              error={hasErrors('firstName')}
              helperText={getFieldErrors('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
              fullWidth
              error={hasErrors('lastName')}
              helperText={getFieldErrors('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={hasErrors('password')}
              helperText={getFieldErrors('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="normal"
              fullWidth
              name="passwordConfirmation"
              label="Confirm password"
              type="password"
              id="passwordConfirmation"
              error={hasErrors('passwordConfirmation')}
              helperText={getFieldErrors('passwordConfirmation')}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <AuthFormLinks type={'signup'}/>
      </Box>
    </>
  )
}

export default SignUp

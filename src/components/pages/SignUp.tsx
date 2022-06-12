import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link as MuiLink } from '@mui/material'
import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth/auth-service'
import useApiError from '../../hooks/use-api-error'
import useNotifications from '../../hooks/use-notifications'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const authService = new AuthService()
  const throwError = useApiError()
  const { triggerSuccessNotification } = useNotifications()
  const navigate = useNavigate()

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // todo: validation
    const result = await authService.signUp(
      data.get('email')!.toString(),
      data.get('firstName')!.toString(),
      data.get('lastName')!.toString(),
      data.get('password')!.toString()
    )

    if (result.success) {
      triggerSuccessNotification('Created new account. Check your email to activate your account.')
      navigate('/')
    } else {
      throwError(result, false)
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
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              id="firstName"
              label="First Name"
              name="firstName"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              id="lastName"
              label="Last Name"
              name="lastName"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              id="passwordConfirm"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <MuiLink href="pages/login#">
              Forgot password?
            </MuiLink>
          </Grid>
          <Grid item>
            <MuiLink component={Link} to="/login">
              Already have an account?
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SignUp

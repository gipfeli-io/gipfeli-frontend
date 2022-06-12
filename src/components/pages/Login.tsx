import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link as MuiLink } from '@mui/material'
import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/use-auth'
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // todo: handle error
    await auth.signIn(
      data.get('email')!.toString(),
      data.get('password')!.toString(),
      () => navigate('/')
    )
  }
  return (
    <>
      <Typography component="h1" variant="h2">
        Sign in
      </Typography>

      <Box component="form" sx={{ mt: 1 }} onSubmit={login}>
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
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
            <MuiLink component={Link} to="/signup">
              Create a free account
            </MuiLink>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login

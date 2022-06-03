import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import React, { FormEvent } from 'react'
import AuthService from '../../services/auth/auth-service'
import { useNavigate } from 'react-router'

const Login = () => {
  const authService: AuthService = new AuthService()
  const navigate = useNavigate()

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // todo: handle error
    await authService.login(
      data.get('email')!.toString(),
      data.get('password')!.toString()
    )

    navigate('/')
  }
  return (
        <>
            <Avatar sx={{ m: 1, width: 80, height: 80 }}>
                <LockOutlinedIcon/>
            </Avatar>
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
                        <Link href="pages/login#">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="pages/login#">
                            {'Create a free account'}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
  )
}

export default Login

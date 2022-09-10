import React from 'react'
import { Grid, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

type AuthFormLinksProps = {
  type: 'signup' | 'passwordReset' | 'login'
}

const AuthFormLinks = ({ type }: AuthFormLinksProps): JSX.Element | null => {
  const signUpLink = <MuiLink component={Link} to="/signup">Create a free account</MuiLink>
  const loginLink = <MuiLink component={Link} to="/login">Already have an account?</MuiLink>
  const resetPasswordLink = <MuiLink component={Link} to="/password-reset">Forgot password?</MuiLink>
  return (
    <Grid container>
      <Grid item xs>
        { type === 'signup' ? loginLink : signUpLink }
      </Grid>
      <Grid item>
        { type === 'passwordReset' ? loginLink : resetPasswordLink }
      </Grid>
    </Grid>
  )
}
export default AuthFormLinks

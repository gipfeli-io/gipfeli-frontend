import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import {FormEvent} from 'react'
import {signIn} from 'next-auth/react'
import {NextPage} from 'next'
import AuthPageLayout from '../layouts/auth-page-layout'
import {useRouter} from 'next/router'
import {useAuth} from '../hooks/use-auth'
import {Alert} from '@mui/material'
import {NextPageWithAuth} from '../types/auth-extended-page'


const Login: NextPageWithAuth = () => {
    const router = useRouter()
    const {isAuthenticated} = useAuth()
    const {error} = useRouter().query

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        await signIn('credentials', {
            email: data.get('email'),
            password: data.get('password'),
            callbackUrl: `${window.location.origin}/`
        })
    }

    if (isAuthenticated) {
        router.push('/tours')
        return null
    }

    return (
        <AuthPageLayout>
            <Avatar sx={{m: 1, width: 80, height: 80}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h2">
                Sign in
            </Typography>

            {error &&
                <Alert severity="error">Invalid credentials.</Alert>
            }

            <Box component="form" sx={{mt: 1}} onSubmit={login}>
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
                    sx={{mt: 3, mb: 2}}
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
        </AuthPageLayout>
    )
}

Login.isPublic = true

export default Login

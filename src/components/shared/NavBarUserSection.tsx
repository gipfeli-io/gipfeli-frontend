import {Button, Stack} from '@mui/material'
import React from 'react'
import {signIn, signOut} from 'next-auth/react'
import {useAuth} from '../../hooks/use-auth'
import Typography from '@mui/material/Typography'

function NavBarUserSection() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Stack spacing={2} direction={'row'}>
                <Button variant={'contained'} id={'join-button'}>Join</Button>
                <Button variant={'outlined'} onClick={() => signIn()}>Login</Button>
            </Stack>
        )
    }

    return (
        <Stack spacing={2} direction={'row'}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Hello, {user}!
            </Typography>
            <Button variant={'outlined'} onClick={() => signOut()} id={'logout-button'}>Logout</Button>
        </Stack>
    )

}

export default NavBarUserSection
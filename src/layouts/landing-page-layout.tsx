import React from 'react'
import {AppBar, Box, Button, Divider, IconButton, Stack, Toolbar} from '@mui/material'
import Typography from '@mui/material/Typography'
import LandscapeIcon from '@mui/icons-material/Landscape'
import Copyright from '../components/shared/Copyright'
import Link from 'next/link'

function LandingPageLayout({children}) {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{mr: 2}}
                    >
                        <LandscapeIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        gipfeli.io
                    </Typography>
                    <Stack spacing={2} direction={'row'}>
                        <Button variant={'contained'}>Join</Button>
                        <Link href={'/app/login'} passHref>
                            <Button variant={'outlined'}>Login</Button>
                        </Link>
                    </Stack>
                </Toolbar>
            </AppBar>

            {children}

            <Copyright/>
        </>
    )
}

export default LandingPageLayout
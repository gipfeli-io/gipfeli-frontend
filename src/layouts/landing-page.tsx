import {ReactElement} from 'react'
import {AppBar, Box, Button, Divider, IconButton, Stack, Toolbar} from '@mui/material'
import Typography from '@mui/material/Typography'
import LandscapeIcon from '@mui/icons-material/Landscape'

function landingPage(page: ReactElement) {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        sx={{mr: 2}}
                    >
                        <LandscapeIcon/>
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        gipfeli.io
                    </Typography>
                    <Stack spacing={2} direction={'row'}>
                        <Button variant={'contained'}>Join</Button>
                        <Button variant={'outlined'}>Login</Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {page}

            <Box sx={{p: 6}} component='footer'>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h6' align='center' gutterBottom>
                    {'Powered by gipfeli.io '}
                    {new Date().getFullYear()}
                </Typography>
                <Typography
                    variant='subtitle1'
                    align='center'
                    color='text.secondary'
                    component='p'
                >
                    Made with ☕ and ❤ in Switzerland.
                </Typography>
            </Box>
        </>
    )
}

export default landingPage
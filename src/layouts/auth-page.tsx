import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {FormEvent, ReactElement} from 'react'
import Copyright from '../components/shared/Copyright'
import {AppBar, IconButton, Toolbar} from '@mui/material'
import LandscapeIcon from '@mui/icons-material/Landscape'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

function authPage(page: ReactElement) {
    return (
        <>
            <AppBar position='fixed' color='transparent' elevation={0}>
                <Toolbar>
                    <Link href={'/'} passHref>
                        <IconButton
                            size='large'
                            edge='start'
                            sx={{mr: 2}}
                        >
                            <LandscapeIcon/>
                        </IconButton>
                    </Link>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        gipfeli.io
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container component='main' sx={{height: '100vh'}}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?mountains)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        {page}

                    </Box>
                    <Copyright/>
                </Grid>
            </Grid>
        </>
    )
}

export default authPage
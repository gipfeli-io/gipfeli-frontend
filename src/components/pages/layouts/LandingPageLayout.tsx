import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/NavBarUserSection'
import Copyright from '../../shared/Copyright'
import { Outlet } from 'react-router-dom'

function LandingPageLayout () {
  return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <LandscapeIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        gipfeli.io
                    </Typography>
                    <NavBarUserSection/>
                </Toolbar>
            </AppBar>

            <Outlet/>

            <Copyright/>
        </>
  )
}

export default LandingPageLayout

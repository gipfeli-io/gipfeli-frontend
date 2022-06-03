import React, { PropsWithChildren } from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NavBarUserSection from '../../shared/NavBarUserSection'
import Copyright from '../../shared/Copyright'

function LandingPageLayout ({ children }: PropsWithChildren<any>) {
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

            {children}

            <Copyright/>
        </>
  )
}

export default LandingPageLayout

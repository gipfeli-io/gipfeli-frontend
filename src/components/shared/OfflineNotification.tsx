import React from 'react'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { SignalWifiOff } from '@mui/icons-material'

const OfflineNotification = () => (
  <>
    <Grid item>
      <Box>
        <Avatar>
          <SignalWifiOff />
        </Avatar>
      </Box>
    </Grid>
    <Grid item>
      <Typography>
        You are offline.
      </Typography>
    </Grid>
  </>
)
export default OfflineNotification

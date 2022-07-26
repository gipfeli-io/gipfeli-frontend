import React from 'react'
import { Alert, AlertTitle, Grid } from '@mui/material'
import ResetApp from '../../shared/ResetApp'
import Typography from '@mui/material/Typography'

const Reset = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }} alignItems={'center'}>
      <Grid item>
        <ResetApp/>
      </Grid>
      <Grid item xs>
        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          Use this button to reset your locally stored application files. This may be useful when you are experiencing
          errors while using the app.
        </Typography>
        <Alert severity={'warning'}>
          <AlertTitle>Warning!</AlertTitle>
          This will delete all locally stored files. Unsynchronized tours will be deleted and all changes are lost.
        </Alert>
      </Grid>
    </Grid>
  )
}

export default Reset

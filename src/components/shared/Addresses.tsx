import { Grid, Link as MuiLink } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'

const Addresses = () => {
  return (
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        <Grid container spacing={5}>
          <Grid item>
            <strong>Gipfeli.io</strong><br/>
            Römerstrasse 209<br/>
            8404 Winterthur<br/>
            Switzerland<br/>
            Mail: <MuiLink href={'mailto:info@gipfeli.io'}>info@gipfeli.io</MuiLink>
          </Grid>
          <Grid item>
            <strong>Gipfeli.io</strong><br/>
            Halbartenstrasse 3<br/>
            5430 Wettingen<br/>
            Switzerland<br/>
            Mail: <MuiLink href={'mailto:info@gipfeli.io'}>info@gipfeli.io</MuiLink>
          </Grid>
        </Grid>
      </Typography>
  )
}

export default Addresses

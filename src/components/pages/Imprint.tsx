import { Container, Grid, Link as MuiLink } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'

const Imprint = () => {
  return (
    <Container maxWidth={'lg'}>
      <Typography variant="h2" gutterBottom component="h1" sx={{ mt: 2 }}>
        Imprint
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Contact Addresses
      </Typography>
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
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Authorized Representatives
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        Sabrina Wullschleger, Developer<br/>
        Lukas Merz, Developer <br/>
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Disclaimer
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        The author reserves the right not to be responsible for the topicality, correctness, completeness or quality of
        the information provided. Liability claims regarding damage caused by the use of any information provided,
        including any kind of information which is incomplete or incorrect, will therefore be rejected. All offers are
        non-binding. Parts of the pages or the complete publication including all offers and information might be
        extended, changed or partly or completely deleted by the author without separate announcement.
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Liability for Links
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        References and links to third party websites are outside our responsibility. We disclaim any responsibility for
        such websites. Access and use of such websites is at the user&apos;s own risk.
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Copyrights
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        The copyright and all other rights to the content, images, photos or other files on the website belong
        exclusively to the company Gipfeli.io or to the specifically named rights holders. For the reproduction of any
        elements, the written consent of the copyright holders must be obtained in advance.
      </Typography>
    </Container>
  )
}

export default Imprint

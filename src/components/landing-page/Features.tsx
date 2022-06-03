import { Card, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { ReactElement } from 'react'
import { ReactComponent as FeatureStorage } from '../../static/img/landing-page/feature_storage.svg'
import { ReactComponent as FeatureOffline } from '../../static/img/landing-page/feature_offline.svg'
import { ReactComponent as FeatureSecurity } from '../../static/img/landing-page/feature_security.svg'

type Feature = {
    title: string
    description: string
    icon: ReactElement
}

const features: Array<Feature> = [
  {
    title: 'Store everything',
    description: 'You cannot only store your trip reports, but you can also upload images, add tags to your routes, pin POIs on an interactive map and much more.',
    icon: <FeatureStorage className='feature-icon'/>
  },
  {
    title: 'Works offline',
    description: 'Ever felt bored after a hard day of hiking in a mountain hut? Now you can write your trip report - even if you do not have connection. We will sync everything once you are back in civilisation.',
    icon: <FeatureOffline className='feature-icon'/>
  },
  {
    title: 'Security built-in',
    description: 'Only you have access to your tours - we never share your data with any third parties.',
    icon: <FeatureSecurity className='feature-icon'/>
  }
]

function Features () {
  return (
        <Grid container spacing={4}>
            {features.map((feature) => (
                <Grid key={feature.title} item xs={12} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                            {feature.icon}
                            <Typography gutterBottom variant='h5' component='h2'>
                                {feature.title}
                            </Typography>
                            <Typography>
                                {feature.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
  )
}

export default Features

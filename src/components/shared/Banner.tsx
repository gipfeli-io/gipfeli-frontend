import React from 'react'
import { Box, Divider, Grid, Paper } from '@mui/material'

type BannerProps = {
  bannerContent: JSX.Element
}

const Banner = ({ bannerContent }: BannerProps) => {
  return (
    <div className="banner">
      <Paper elevation={1}>
        <Box pt={2} pr={1} pb={1} pl={2}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap" justifyContent="center">
            {bannerContent}
          </Grid>
        </Box>
      </Paper>
      <Divider sx={{ mb: 3 }}/>
  </div>
  )
}
export default Banner

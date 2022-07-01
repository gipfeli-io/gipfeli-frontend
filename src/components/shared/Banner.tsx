import React from 'react'
import { Box, Divider, Grid, Paper } from '@mui/material'

type BannerProps = {
  bannerContent: JSX.Element | null
}

const Banner = ({ bannerContent }: BannerProps) => {
  if (!bannerContent) {
    return null
  }
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

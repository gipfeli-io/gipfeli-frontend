import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return <Backdrop open>
    <CircularProgress color="inherit"/>
  </Backdrop>
}

export default Loader

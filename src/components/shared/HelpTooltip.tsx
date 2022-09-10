import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Tooltip } from '@mui/material'

type HelpToolTipProps = {
  tooltip: string;
}
const HelpTooltip = ({ tooltip }: HelpToolTipProps) => {
  return (
    <Tooltip title={tooltip}>
      <HelpOutlineIcon sx={{ verticalAlign: 'middle' }}/>
    </Tooltip>
  )
}

export default HelpTooltip

import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { NavItem } from './ResponsiveAppBar'
import { Link } from 'react-router-dom'

type DesktopNavItemsProps = {
  pages: NavItem[]
}

const DesktopNavItems = ({ pages }: DesktopNavItemsProps) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
      {pages.map((page) => (
        <Button key={page.label} component={Link} to={page.to} variant="text" color="inherit">{page.label}</Button>
      ))}
    </Box>
  )
}

export default DesktopNavItems

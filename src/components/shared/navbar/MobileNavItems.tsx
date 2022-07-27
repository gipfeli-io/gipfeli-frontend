import React from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import { NavItem } from './ResponsiveAppBar'
import { Menu, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

type MobileNavItemsProps = {
  pages: NavItem[]
}

const MobileNavItems = ({ pages }: MobileNavItemsProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      {pages.length > 0 &&
          <>
              <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                  <MenuIcon/>
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} component={Link} to={page.to} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
          </>
      }

    </Box>
  )
}

export default MobileNavItems

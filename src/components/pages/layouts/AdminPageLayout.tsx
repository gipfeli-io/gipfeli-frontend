import React from 'react'
import { Container } from '@mui/material'
import RequireAuth from '../../auth/RequireAuth'
import { matchPath, Outlet, PathMatch, useLocation } from 'react-router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link } from 'react-router-dom'
import { ParamParseKey } from 'react-router/lib/router'
import Typography from '@mui/material/Typography'

/**
 * Tab navigation is based on https://mui.com/material-ui/guides/routing/#tabs, but adapted to suit our needs.
 */
type TabRouteLink = {
  label: string; // Tab label
  to: string; // Path where the link should map to
  value: string; // Matches an adminroute, such as "/admin" or "/admin/users"
}

const baseAdminPath = '/admin'

/**
 * Define all admin navigation links here and match them to their full path as specified in the routing definition.
 */
const adminNavigationLinks: TabRouteLink[] = [
  {
    label: 'Statistics',
    to: '',
    value: baseAdminPath
  },
  {
    label: 'Users',
    to: 'users',
    value: `${baseAdminPath}/users`
  }
]

const AdminPageLayout = () => {
  /**
   * Checks a given pathName against all possible routes in adminNavigationLinks.
   * @param pathName
   */
  const patternMatcher: (pathName: string) => PathMatch<ParamParseKey<string>> | null = (pathName: string) => {
    const patterns = adminNavigationLinks.map((adminRoute) => adminRoute.value)

    for (const pattern of patterns) {
      const match = matchPath(pattern, pathName)
      if (match) {
        return match
      }
    }

    return null
  }

  /**
   * Returns the current route path match to select a given tab. This allows us to show the current location. If the
   * given route is not a top-level admin link, it tries to recursively remove URL segments to find a match. This allows
   * nested urls such as /admin/users/:id/edit to map to /admin/users as well.
   */
  const getCurrentUrl: () => (PathMatch<ParamParseKey<string>> | null) = () => {
    let { pathname } = useLocation()
    const baseMatch = patternMatcher(pathname)

    if (baseMatch) {
      return baseMatch
    }

    // Recursively remove the last URL segment to match against parent segments
    while (pathname.length !== 0) {
      pathname = pathname.replace(/.([^/]*$)/, '')

      if (pathname !== baseAdminPath) {
        const subMatch = patternMatcher(pathname)

        if (subMatch) {
          return subMatch
        }
      }
    }

    return null
  }

  const getCurrentRoute = () => {
    const routeMatch = getCurrentUrl()

    return routeMatch?.pattern?.path
  }
  return (
    <RequireAuth>
      <>
        <Container maxWidth={'lg'}>
          <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
            Admin Area
          </Typography>
          <Tabs value={getCurrentRoute()}>
            {adminNavigationLinks.map((adminRoute, index) =>
              <Tab key={index} label={adminRoute.label} value={adminRoute.value} to={adminRoute.to} component={Link}/>
            )}
          </Tabs>
          <Outlet/>
        </Container>
      </>
    </RequireAuth>
  )
}

export default AdminPageLayout

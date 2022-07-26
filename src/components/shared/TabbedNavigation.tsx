import React from 'react'
import { Container } from '@mui/material'
import { matchPath, PathMatch, useLocation } from 'react-router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Link } from 'react-router-dom'
import { ParamParseKey } from 'react-router/lib/router'
import Typography from '@mui/material/Typography'

export type TabRouteLink = {
  label: string; // Tab label
  to: string; // Path where the link should map to
  value: string; // Matches an adminroute, such as "/admin" or "/admin/users"
}

type TabbedNavigationProps = {
  title: string;
  navLinks: TabRouteLink[];
  navBasePath: string;
  children: React.ReactNode
}

/**
 * Tab navigation is based on https://mui.com/material-ui/guides/routing/#tabs, but adapted to suit our needs.
 */
const TabbedNavigation = ({ title, navLinks, navBasePath, children }:TabbedNavigationProps) => {
  /**
   * Checks a given pathName against all possible routes in navLinks.
   * @param pathName
   */
  const patternMatcher: (pathName: string) => PathMatch<ParamParseKey<string>> | null = (pathName: string) => {
    const patterns = navLinks.map((navLink) => navLink.value)

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

      if (pathname !== navBasePath) {
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
      <>
        <Container maxWidth={'lg'}>
          <Typography variant="h2" gutterBottom component="div" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Tabs value={getCurrentRoute()}>
            {navLinks.map((navLink, index) =>
              <Tab key={index} label={navLink.label} value={navLink.value} to={navLink.to} component={Link}/>
            )}
          </Tabs>
          {children}
        </Container>
      </>
  )
}

export default TabbedNavigation

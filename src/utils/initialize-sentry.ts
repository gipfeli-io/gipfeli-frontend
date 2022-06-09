import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import React from 'react'
import { useLocation } from 'react-router'
import { createRoutesFromChildren, matchRoutes, Routes, useNavigationType } from 'react-router-dom'

/**
 * Initialize Sentry if required. Returns either a Sentry-wrapped <Routes> component for performance tracing, or a
 * default ReactRouter <Routes> component if we're not using Sentry.
 * @param sentryDsn
 * @param sentryEnvironment
 */
const initializeSentry = (sentryDsn: string | undefined, sentryEnvironment: string = 'localhost') => {
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        )
      })],
      environment: sentryEnvironment ?? 'localhost',
      // set trace samplerate to low on production to not impact performance
      tracesSampleRate: sentryEnvironment === 'production' ? 0.01 : 0.2
    })

    return Sentry.withSentryReactRouterV6Routing(Routes)
  }

  return Routes
}

export default initializeSentry

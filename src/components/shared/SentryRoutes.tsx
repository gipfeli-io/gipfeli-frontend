import * as Sentry from '@sentry/react'
import { Routes } from 'react-router-dom'

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

export default SentryRoutes

import React, { Component, ErrorInfo, ReactNode } from 'react'
import NotificationContext, { NotificationContextType } from '../../contexts/NotificationContext'
import ServerError from '../pages/ServerError'

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * The errorboundary handles all unhandled errors that are thrown throughout the application.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static contextType: React.Context<NotificationContextType> = NotificationContext
  public context!: React.ContextType<typeof NotificationContext>
  public state: ErrorBoundaryState = {
    hasError: false
  }

  public static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // todo log to sentry
    console.log(error)
  }

  /**
   * Depending on the error thrown, we either trigger a notification and redirect to the tour index, or we render a 500
   * error page if something really terrible happened (like API down).
   */
  public render () {
    return this.state.hasError ? this.render500Page() : this.props.children
  }

  private render500Page () {
    return <ServerError error={this.state.error}/>
  }
}

export default ErrorBoundary

import React, { Component, ErrorInfo, ReactNode } from 'react'
import NotificationContext, { NotificationContextType } from '../../contexts/notification-context'
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

  // eslint-disable-next-line unused-imports/no-unused-vars
  public componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // todo log to sentry
    console.log(error)
  }

  /**
   * If we have an error at this point, we render the 500 page because something terrible happened. Otherwise, we render
   * the component tree.
   */
  public render () {
    return this.state.hasError ? this.render500Page() : this.props.children
  }

  private render500Page () {
    return <ServerError error={this.state.error}/>
  }
}

export default ErrorBoundary

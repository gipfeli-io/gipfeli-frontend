import React, { Component, ErrorInfo, ReactNode } from 'react'
import NotificationContext from '../../contexts/notification-context'
import ServerError from '../pages/ServerError'
import { NotificationContextType } from '../../types/contexts'
import { UnauthorizedAdminAccess } from '../../types/errors'
import AdminAccessPrevention from '../pages/AdminAccessPrevention'
import ErrorBoundaryContext from '../../contexts/error-boundary-context'

type ErrorBoundaryProps = {
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * The errorboundary handles all unhandled errors that are thrown throughout the application.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static contextType: React.Context<NotificationContextType> = NotificationContext
  public state: ErrorBoundaryState = {
    hasError: false
  }

  public static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public triggerError = (_error: Error, _errorInfo?: ErrorInfo) => {
    this.setState({ hasError: true })
  }

  /**
   * If we have an error at this point, we render the 500 page because something terrible happened. Otherwise, we render
   * the component tree.
   */
  public render () {
    return <>
      <ErrorBoundaryContext.Provider value={{ triggerError: this.triggerError }}>
        {this.state.hasError
          ? this.renderErrorPage()
          : this.props.children
        }
      </ErrorBoundaryContext.Provider>
    </>
  }

  private renderErrorPage () {
    if (this.state.error instanceof UnauthorizedAdminAccess) {
      return <AdminAccessPrevention />
    }

    return <ServerError error={this.state.error}/>
  }
}

export default ErrorBoundary

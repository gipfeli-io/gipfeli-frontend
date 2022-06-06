import React, { Component, ErrorInfo, ReactNode } from 'react'
import NotificationContext, { NotificationContextType } from '../../contexts/NotificationContext'
import ServerError from '../pages/ServerError'
import { NonCriticalApiError } from '../../types/errors'

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  context!: React.ContextType<typeof NotificationContext>
  static contextType: React.Context<NotificationContextType> = NotificationContext
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError (error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // todo log to sentry
    console.log(error)
  }

  private render500Page () {
    return <ServerError error={this.state.error} />
  }

  public render () {
    const { hasError, error } = this.state
    if (hasError) {
      if (error && error instanceof NonCriticalApiError) {
        this.context.triggerErrorNotification(error.message)
      } else {
        return this.render500Page()
      }
    }

    return this.props.children
  }
}

export default ErrorBoundary

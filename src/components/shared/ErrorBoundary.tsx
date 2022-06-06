import React, { Component, ErrorInfo, ReactNode } from 'react'
import NotificationContext, { NotificationContextType } from '../../contexts/NotificationContext'

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<Props, State> {
  context!: React.ContextType<typeof NotificationContext>
  static contextType: React.Context<NotificationContextType> = NotificationContext
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError (error: Error): State {
    return { hasError: true, errorMessage: error.message }
  }

  public componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    // todo log to sentry
    console.log(error)
  }

  public render () {
    /* if (this.state.hasError) {
      return <ServerError error={this.state.errorMessage}/>
    } */
    if (this.state.hasError) {
      this.context.triggerErrorNotification('asd')
      return <h1>yolo</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary

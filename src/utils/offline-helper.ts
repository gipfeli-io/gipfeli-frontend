import { NavigateFunction } from 'react-router'

export const isOfflineResultMessage = (statusCode: number, statusMessage: string): boolean => {
  return statusCode === 500 && (statusMessage === 'Failed to fetch' || statusMessage === 'Load failed')
}

export const redirectAfterConnectionStatusChange = (locationPathname: string, navigate: NavigateFunction): void => {
  // refresh page to get application working offline
  if (locationPathname !== '/tours/create') {
    navigate(0)
  } else {
    navigate('/tours', { replace: true })
  }
}

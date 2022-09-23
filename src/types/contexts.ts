import { Notification } from './notifications'
import { AppTheme } from './theme'
import { handleSave } from './handle-save'
import { CurrentUpload, GpxFileUpload, ImageUpload } from './media'
import { ConnectionStatus } from '../enums/connection-status'
import { ErrorInfo } from 'react'
import { Map } from 'ol'

export interface DeleteEntryContextType {
  showDeleteModal: boolean
  toggleModal: () => void
  deleteId: string | undefined
  setDeleteId: (id: string | undefined) => void
}

export interface MapContextType {
  map: Map
}

export interface AuthenticationContextType {
  email: string | undefined
  isLoggedIn: boolean
  isAdmin: boolean
  token: string | undefined
  signIn: (email: string, password: string, callback: () => void) => Promise<void>
  signOut: (callback: () => void) => void
}

export interface NotificationContextType {
  notification: Notification | undefined
  triggerErrorNotification: (message: string) => void
  triggerSuccessNotification: (message: string) => void
  triggerOfflineNotification: () => void
  triggerSyncFailedNotification: (message: string) => void
  resetNotification: () => void
}

export interface ConnectionStatusContextType {
  isOffline: () => boolean
  updateConnectionStatus: (connectionStatus: ConnectionStatus) => void
  updateGoOnlineButtonVisibility: (isVisible: boolean) => void
  showGoOnlineButton: boolean
  isOnlineInfoBannerVisible: boolean
  updateOnlineInfoBannerVisibility: (isVisible: boolean) => void
  resetOnlineInfoBanner: () => void
}

export interface ThemeContextType {
  activeTheme: AppTheme
  toggleTheme: () => void
}

export interface ImageUploadContextType {
  files: ImageUpload[]
  save: handleSave<File[]>
  remove: (id: string) => void
  currentUploads: CurrentUpload[]
}

export interface GpxFileUploadContextType {
  file: GpxFileUpload | undefined
  save: handleSave<File>
  remove: (id: string) => void
  currentUpload?: CurrentUpload
}

export interface ErrorBoundaryContextType {
  triggerError: (error: Error, errorInfo?: ErrorInfo) => void
}

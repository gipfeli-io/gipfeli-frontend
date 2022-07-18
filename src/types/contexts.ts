import { Notification } from './notifications'
import { AppTheme } from './theme'
import { handleSave } from './handle-save'
import { CurrentUpload, ImageUpload } from './media'
import { ConnectionStatus } from '../enums/connection-status'

export interface TourListContextProperties {
  deleteEvent: (id: string) => void
}

export interface AuthenticationContextType {
  email: string | undefined
  token: string | undefined
  signIn: (email: string, password: string, callback: () => void) => void
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
  updateConnectionStatusSwitcherVisibility: (isVisible: boolean) => void
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

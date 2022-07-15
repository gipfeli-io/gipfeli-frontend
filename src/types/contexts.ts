import { Notification } from './notifications'
import { AppTheme } from './theme'
import { handleSave } from './handle-save'
import { CurrentUpload, ImageUpload } from './media'
import { ConnectionStatus } from '../enums/connection-status'
import { OnlineBannerStatus } from '../enums/OnlineBannerStatus'

export interface TourListContextProperties {
  deleteEvent: (id: string) => void
}

export interface AuthenticationContextType {
  email: string | undefined;
  token: string | undefined;
  signIn: (email: string, password: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}

export interface NotificationContextType {
  notification: Notification | undefined;
  triggerErrorNotification: (message: string) => void;
  triggerSuccessNotification: (message: string) => void;
  triggerOfflineNotification: () => void;
  resetNotification: () => void;
}

export interface ConnectionStatusContextType {
  isOffline: () => boolean
  showOnlineBanner: () => boolean,
  updateOnlineBannerStatus: (onlineBannerStatus: OnlineBannerStatus) => void,
  updateConnectionStatus: (connectionStatus: ConnectionStatus) => void,
  updateConnectionStatusSwitcherVisibility: (isVisible: boolean) => void,
  showConnectionStatusSwitcher: boolean
}

export interface ThemeContextType {
  activeTheme: AppTheme;
  toggleTheme: () => void;
}

export interface ImageUploadContextType {
  files: ImageUpload[];
  save: handleSave<File[]>;
  remove: (id: string) => void;
  currentUploads: CurrentUpload[];
}

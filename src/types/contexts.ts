import { Notification } from './notifications'
import { AppTheme } from './theme'

export interface TourListContextProperties {
  deleteEvent: (id: string) => void
}

export interface AuthenticationContextType {
  username: string | undefined;
  token: string | undefined;
  signIn: (username: string, password: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}

export interface NotificationContextType {
  notification: Notification | undefined;
  triggerErrorNotification: (message: string) => void;
  triggerSuccessNotification: (message: string) => void;
  resetNotification: () => void;
}

export interface ThemeContextType {
  activeTheme: AppTheme;
  toggleTheme: () => void;
}

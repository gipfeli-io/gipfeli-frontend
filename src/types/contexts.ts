import { Notification } from './notifications'
import { AppTheme } from './theme'
import { handleSave } from './handle-save'
import { ImageUpload } from './media'

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
  resetNotification: () => void;
}

export interface ThemeContextType {
  activeTheme: AppTheme;
  toggleTheme: () => void;
}

export interface ImageUploadContextType {
  files: ImageUpload[];
  save: handleSave<File[]>;
  remove: (id: string) => void;
}

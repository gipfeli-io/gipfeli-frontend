import { NotificationType } from '../enums/notification-type'

export interface Notification {
  visible: boolean;
  type: NotificationType
  message: string,
  autoHide: boolean
}

import { NotificationType } from '../enums/notification-type'

export interface Notification {
  visible: boolean;
  type: NotificationType
  message: string,
  autoHideDuration: number | null | undefined
}

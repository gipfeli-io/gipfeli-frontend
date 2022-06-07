import { NotificationType } from '../enums/notification-type'

export interface Notification {
  visible: boolean;
  type: NotificationType
  message: string
}

export class ErrorNotification implements Notification {
  visible: boolean
  message: string
  type: NotificationType

  constructor (message: string) {
    this.visible = true
    this.type = NotificationType.ERROR
    this.message = message
  }
}

export class SuccessNotification implements Notification {
  visible: boolean
  message: string
  type: NotificationType

  constructor (message: string) {
    this.visible = true
    this.type = NotificationType.SUCCESS
    this.message = message
  }
}

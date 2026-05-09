export type NotificationType =
  | 'new_appointment'
  | 'changed_appointment'
  | 'cancelled_appointment'
  | 'payment_due'
  | 'payment_blocked'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  appointmentId: string | null
  isRead: boolean
  createdAt: string
}

import { apiClient } from '@/shared/services/api'
import type { Notification } from './types/notification.types'

export const notificationsApi = {
  list: async (): Promise<Notification[]> =>
    (await apiClient.get<Notification[]>('/notifications')).data,

  markAllRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/read-all')
  },

  markOneRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`)
  },
}

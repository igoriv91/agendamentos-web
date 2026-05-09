import { apiClient } from '@/shared/services/api'
import type { AdminCompany, AdminStats } from './types/admin.types'

export const adminApi = {
  getStats: async (): Promise<AdminStats> =>
    (await apiClient.get<AdminStats>('/admin/stats')).data,

  listCompanies: async (): Promise<AdminCompany[]> =>
    (await apiClient.get<AdminCompany[]>('/admin/companies')).data,

  updateStatus: async (
    id: string,
    status: 'active' | 'blocked' | 'pending',
  ): Promise<void> => {
    await apiClient.patch(`/admin/companies/${id}/status`, { status })
  },
}

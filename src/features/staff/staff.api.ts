import { apiClient } from '@/shared/services/api'
import type { Staff, CreateStaffPayload, UpdateStaffPayload } from './types/staff.types'

export const staffApi = {
  list: async (): Promise<Staff[]> => {
    const res = await apiClient.get<Staff[]>('/staff')
    return res.data
  },
  getById: async (id: string): Promise<Staff> => {
    const res = await apiClient.get<Staff>(`/staff/${id}`)
    return res.data
  },
  create: async (data: CreateStaffPayload): Promise<Staff> => {
    const res = await apiClient.post<Staff>('/staff', data)
    return res.data
  },
  update: async (id: string, data: UpdateStaffPayload): Promise<Staff> => {
    const res = await apiClient.put<Staff>(`/staff/${id}`, data)
    return res.data
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/staff/${id}`)
  },
}

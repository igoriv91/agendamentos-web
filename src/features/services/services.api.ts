import { apiClient } from '@/shared/services/api'
import type { Service, CreateServicePayload, UpdateServicePayload } from './types/service.types'

export const servicesApi = {
  list: async (): Promise<Service[]> => (await apiClient.get<Service[]>('/services')).data,
  getById: async (id: string): Promise<Service> => (await apiClient.get<Service>(`/services/${id}`)).data,
  create: async (data: CreateServicePayload): Promise<Service> =>
    (await apiClient.post<Service>('/services', data)).data,
  update: async (id: string, data: UpdateServicePayload): Promise<Service> =>
    (await apiClient.put<Service>(`/services/${id}`, data)).data,
  remove: async (id: string): Promise<void> => { await apiClient.delete(`/services/${id}`) },
}

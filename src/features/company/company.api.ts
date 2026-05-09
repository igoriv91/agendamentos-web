import { apiClient } from '@/shared/services/api'

export interface Company {
  id: string
  name: string
  slug: string
  email: string
  phone: string | null
  status: string
  bookingLinkToken: string
}

export interface BusinessHour {
  id: string
  staffId: string
  dayOfWeek: number
  openTime: string
  closeTime: string
  isOpen: boolean
}

export interface BusinessHourInput {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isOpen: boolean
}

export const companyApi = {
  getMe: async (): Promise<Company> => (await apiClient.get<Company>('/companies/me')).data,
  update: async (data: Partial<Pick<Company, 'name' | 'phone' | 'email'>>): Promise<Company> =>
    (await apiClient.put<Company>('/companies/me', data)).data,
  regenerateToken: async (): Promise<{ bookingLinkToken: string }> =>
    (await apiClient.post<{ bookingLinkToken: string }>('/companies/me/regenerate-token')).data,
  getBusinessHours: async (staffId: string): Promise<BusinessHour[]> =>
    (await apiClient.get<BusinessHour[]>(`/business-hours/${staffId}`)).data,
  saveBusinessHours: async (staffId: string, hours: BusinessHourInput[]): Promise<void> => {
    await apiClient.put(`/business-hours/${staffId}`, hours)
  },
}

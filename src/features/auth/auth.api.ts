import { apiClient } from '@/shared/services/api'
import type { LoginFormData, RegisterPayload } from './schemas/auth.schema'

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: 'superadmin' | 'company_admin'
    companyId: string | null
  }
  company: {
    id: string
    name: string
    slug: string
  } | null
}

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register', data)
    return res.data
  },
}

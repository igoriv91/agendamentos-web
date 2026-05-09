import { apiClient } from '@/shared/services/api'

export interface Subscription {
  id: string
  companyId: string
  planSlots: number
  maxStaff: number
  monthlyPrice: number
  dueDate: string
  gracePeriodEnd: string
  status: 'active' | 'overdue' | 'grace' | 'blocked'
  gatewayPaymentId: string | null
}

export const subscriptionApi = {
  getMe: async (): Promise<Subscription> =>
    (await apiClient.get<Subscription>('/subscriptions/me')).data,

  checkout: async (planSlots: number): Promise<{ checkoutUrl: string }> =>
    (await apiClient.post<{ checkoutUrl: string }>('/subscriptions/checkout', { planSlots })).data,
}

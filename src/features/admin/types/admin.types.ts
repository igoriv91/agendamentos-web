export interface AdminSubscription {
  id: string
  planSlots: number
  maxStaff: number
  monthlyPrice: number
  dueDate: string
  gracePeriodEnd: string
  status: 'active' | 'overdue' | 'grace' | 'blocked'
}

export interface AdminCompany {
  id: string
  name: string
  slug: string
  email: string
  status: 'pending' | 'active' | 'blocked'
  createdAt: string
  staffCount: number
  appointmentCount: number
  subscription: AdminSubscription | null
}

export interface AdminStats {
  totalCompanies: number
  activeCount: number
  blockedCount: number
  monthlyRevenue: number
}

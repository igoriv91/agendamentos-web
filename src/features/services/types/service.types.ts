export interface Service {
  id: string
  companyId: string
  staffId: string | null
  name: string
  description: string | null
  durationMinutes: number
  price: string | null
  isActive: boolean
  createdAt: string
  staff: { id: string; name: string } | null
}

export type CreateServicePayload = {
  name: string
  durationMinutes: number
  staffId?: string
  description?: string
  price?: number
}
export type UpdateServicePayload = Partial<CreateServicePayload & { isActive: boolean }>

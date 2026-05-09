export interface Staff {
  id: string
  companyId: string
  name: string
  email: string | null
  phone: string | null
  isActive: boolean
  createdAt: string
}

export type CreateStaffPayload = Pick<Staff, 'name'> & Partial<Pick<Staff, 'email' | 'phone'>>
export type UpdateStaffPayload = Partial<CreateStaffPayload & { isActive: boolean }>

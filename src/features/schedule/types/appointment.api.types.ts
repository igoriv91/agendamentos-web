export interface AppointmentApiResponse {
  id: string
  companyId: string
  staffId: string
  serviceId: string
  clientId: string | null
  scheduledAt: string
  durationMinutes: number
  serviceName: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  cancelledBy: 'client' | 'company' | null
  notes: string | null
  createdAt: string
  updatedAt: string
  staff:  { id: string; name: string }
  client: { id: string; name: string; phone: string } | null
}

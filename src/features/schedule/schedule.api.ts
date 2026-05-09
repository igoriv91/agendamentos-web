import { apiClient } from '@/shared/services/api'
import { appointmentMapper } from './mappers/appointment.mapper'
import type { AppointmentApiResponse } from './types/appointment.api.types'
import type { Appointment } from './types/appointment.types'

export interface CreateAppointmentPayload {
  staffId: string
  serviceId: string
  scheduledAt: string
  notes?: string
  clientId?: string
  clientName?: string
  clientPhone?: string
}

export interface UpdateAppointmentPayload {
  staffId?: string
  serviceId?: string
  scheduledAt?: string
  clientName?: string
  clientPhone?: string
  notes?: string
}

export const scheduleApi = {
  list: async (startDate: string, endDate: string, staffId?: string): Promise<Appointment[]> => {
    const params: Record<string, string> = { startDate, endDate }
    if (staffId) params['staffId'] = staffId
    const res = await apiClient.get<AppointmentApiResponse[]>('/appointments', { params })
    return res.data.map(appointmentMapper.toDomain)
  },

  getById: async (id: string): Promise<Appointment> => {
    const res = await apiClient.get<AppointmentApiResponse>(`/appointments/${id}`)
    return appointmentMapper.toDomain(res.data)
  },

  create: async (data: CreateAppointmentPayload): Promise<Appointment> => {
    const res = await apiClient.post<AppointmentApiResponse>('/appointments', data)
    return appointmentMapper.toDomain(res.data)
  },

  update: async (id: string, data: UpdateAppointmentPayload): Promise<Appointment> => {
    const res = await apiClient.put<AppointmentApiResponse>(`/appointments/${id}`, data)
    return appointmentMapper.toDomain(res.data)
  },

  updateStatus: async (
    id: string,
    status: 'confirmed' | 'completed' | 'cancelled',
    cancelledBy?: 'company' | 'client',
  ): Promise<void> => {
    await apiClient.patch(`/appointments/${id}/status`, { status, cancelledBy })
  },
}

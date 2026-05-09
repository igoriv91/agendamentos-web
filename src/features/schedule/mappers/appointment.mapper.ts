import { addMinutes } from 'date-fns'
import type { AppointmentApiResponse } from '../types/appointment.api.types'
import type { Appointment, CalendarEvent } from '../types/appointment.types'

export const appointmentMapper = {
  toDomain(api: AppointmentApiResponse): Appointment {
    const scheduledAt = new Date(api.scheduledAt)
    return {
      id:              api.id,
      staffId:         api.staffId,
      staffName:       api.staff.name,
      serviceId:       api.serviceId,
      serviceName:     api.serviceName,
      clientId:        api.clientId,
      clientName:      api.client?.name ?? 'Cliente não informado',
      clientPhone:     api.client?.phone ?? '',
      scheduledAt,
      endAt:           addMinutes(scheduledAt, api.durationMinutes),
      durationMinutes: api.durationMinutes,
      status:          api.status,
      cancelledBy:     api.cancelledBy,
      notes:           api.notes,
    }
  },

  toCalendarEvent(appointment: Appointment): CalendarEvent {
    return {
      id:       appointment.id,
      title:    `${appointment.clientName} — ${appointment.serviceName}`,
      start:    appointment.scheduledAt,
      end:      appointment.endAt,
      resource: appointment,
    }
  },
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Appointment {
  id: string
  staffId: string
  staffName: string
  serviceId: string
  serviceName: string
  clientId: string | null
  clientName: string
  clientPhone: string
  scheduledAt: Date
  endAt: Date
  durationMinutes: number
  status: AppointmentStatus
  cancelledBy: 'client' | 'company' | null
  notes: string | null
}

// react-big-calendar event shape
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: Appointment
}

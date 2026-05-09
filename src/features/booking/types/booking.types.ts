export type BookingStep = 'staff' | 'service' | 'slot' | 'guest' | 'confirm'

export interface BookingStaff {
  id: string
  name: string
  phone: string | null
}

export interface BookingService {
  id: string
  name: string
  durationMinutes: number
  price: string | null
  description: string | null
}

export interface BookingCompany {
  id: string
  name: string
  slug: string
}

export interface BookingAppointment {
  id: string
  serviceName: string
  scheduledAt: string
  durationMinutes: number
  status: string
  staff: { name: string }
}

export interface BookingResult {
  appointmentId: string
  clientId: string
}

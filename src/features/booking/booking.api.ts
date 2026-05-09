import axios from 'axios'
import type {
  BookingCompany, BookingStaff, BookingService, BookingAppointment, BookingResult,
} from './types/booking.types'

// Public API — no auth token needed
const publicClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const base = (token: string) => `/book/${token}`

export const bookingApi = {
  getCompany: async (token: string): Promise<BookingCompany> =>
    (await publicClient.get<BookingCompany>(base(token))).data,

  listStaff: async (token: string): Promise<BookingStaff[]> =>
    (await publicClient.get<BookingStaff[]>(`${base(token)}/staff`)).data,

  listServices: async (token: string, staffId: string): Promise<BookingService[]> =>
    (await publicClient.get<BookingService[]>(`${base(token)}/staff/${staffId}/services`)).data,

  getAvailability: async (
    token: string, staffId: string, date: string, serviceId: string,
  ): Promise<string[]> =>
    (await publicClient.get<string[]>(
      `${base(token)}/staff/${staffId}/availability`,
      { params: { date, serviceId } },
    )).data,

  createAppointment: async (
    token: string,
    payload: {
      staffId: string; serviceId: string; scheduledAt: string
      clientId?: string; clientName?: string; clientPhone?: string
    },
  ): Promise<BookingResult> =>
    (await publicClient.post<BookingResult>(`${base(token)}/appointments`, payload)).data,

  getClientAppointments: async (
    token: string, clientId: string,
  ): Promise<BookingAppointment[]> =>
    (await publicClient.get<BookingAppointment[]>(
      `${base(token)}/appointments`, { params: { clientId } },
    )).data,

  cancelAppointment: async (
    token: string, appointmentId: string, clientId: string,
  ): Promise<void> => {
    await publicClient.delete(`${base(token)}/appointments/${appointmentId}`, {
      data: { clientId },
    })
  },
}

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { bookingApi } from '../booking.api'
import type {
  BookingStep, BookingStaff, BookingService,
  BookingCompany, BookingResult, TimeSlot,
} from '../types/booking.types'

const CLIENT_KEY = (token: string) => `booking_client_id_${token}`

export const useBooking = () => {
  const { token } = useParams<{ token: string }>()

  // State
  const [step,    setStep]    = useState<BookingStep>('staff')
  const [company, setCompany] = useState<BookingCompany | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Selections
  const [staffList,     setStaffList]     = useState<BookingStaff[]>([])
  const [selectedStaff, setSelectedStaff] = useState<BookingStaff | null>(null)

  const [serviceList,     setServiceList]     = useState<BookingService[]>([])
  const [selectedService, setSelectedService] = useState<BookingService | null>(null)

  const [selectedDate,  setSelectedDate]  = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [slots,         setSlots]         = useState<TimeSlot[]>([])
  const [selectedSlot,  setSelectedSlot]  = useState<string | null>(null)
  const [loadingSlots,  setLoadingSlots]  = useState(false)

  // Result
  const [result, setResult] = useState<BookingResult | null>(null)

  // ───────────────────────────────────────────────────────
  // Load company on mount
  useEffect(() => {
    if (!token) return
    setIsLoading(true)
    bookingApi.getCompany(token)
      .then((c) => { setCompany(c); return bookingApi.listStaff(token) })
      .then(setStaffList)
      .catch(() => setError('Link de agendamento inválido ou expirado'))
      .finally(() => setIsLoading(false))
  }, [token])

  // ───────────────────────────────────────────────────────
  // Step: Staff → Service
  const handleSelectStaff = async (staff: BookingStaff) => {
    setSelectedStaff(staff)
    setIsLoading(true)
    try {
      const services = await bookingApi.listServices(token!, staff.id)
      setServiceList(services)
      setStep('service')
    } catch { toast.error('Erro ao carregar serviços') }
    finally { setIsLoading(false) }
  }

  // ───────────────────────────────────────────────────────
  // Step: Service → Slot
  const handleSelectService = (service: BookingService) => {
    setSelectedService(service)
    setStep('slot')
  }

  // Load slots when date changes
  useEffect(() => {
    if (step !== 'slot' || !selectedStaff || !selectedService || !token) return
    setLoadingSlots(true)
    bookingApi
      .getAvailability(token, selectedStaff.id, selectedDate, selectedService.id)
      .then(setSlots)
      .catch(() => toast.error('Erro ao carregar horários'))
      .finally(() => setLoadingSlots(false))
  }, [step, selectedDate, selectedStaff, selectedService, token])

  // ───────────────────────────────────────────────────────
  // Step: Slot → Guest
  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot)

    // Check if we already have a stored clientId
    const storedId = localStorage.getItem(CLIENT_KEY(token!))
    setStep(storedId ? 'guest' : 'guest')   // always ask for confirmation
  }

  // ───────────────────────────────────────────────────────
  // Step: Guest → Confirm (create appointment)
  const handleConfirm = async (guestName: string, guestPhone: string) => {
    setIsLoading(true)
    try {
      const storedClientId = localStorage.getItem(CLIENT_KEY(token!)) ?? undefined
      const scheduledAt = `${selectedDate}T${selectedSlot}:00`

      const res = await bookingApi.createAppointment(token!, {
        staffId:   selectedStaff!.id,
        serviceId: selectedService!.id,
        scheduledAt: new Date(scheduledAt).toISOString(),
        clientId:   storedClientId,
        clientName: storedClientId ? undefined : guestName,
        clientPhone: storedClientId ? undefined : guestPhone,
      })

      localStorage.setItem(CLIENT_KEY(token!), res.clientId)
      setResult(res)
      setStep('confirm')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao agendar')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    const prev: Record<BookingStep, BookingStep> = {
      staff: 'staff', service: 'staff', slot: 'service', guest: 'slot', confirm: 'confirm',
    }
    setStep(prev[step])
  }

  const handleRestart = () => {
    setStep('staff')
    setSelectedStaff(null)
    setSelectedService(null)
    setSelectedSlot(null)
    setResult(null)
  }

  return {
    token: token!,
    step, company, isLoading, error,
    staffList, selectedStaff, handleSelectStaff,
    serviceList, selectedService, handleSelectService,
    selectedDate, setSelectedDate, slots, selectedSlot, loadingSlots, handleSelectSlot,
    result, handleConfirm, handleBack, handleRestart,
  }
}

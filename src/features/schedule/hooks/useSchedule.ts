import { useCallback, useEffect, useState } from 'react'
import { startOfWeek, endOfWeek, format } from 'date-fns'
import { toast } from 'sonner'
import type { View } from 'react-big-calendar'
import { scheduleApi } from '../schedule.api'
import { appointmentMapper } from '../mappers/appointment.mapper'
import type { Appointment, CalendarEvent } from '../types/appointment.types'

export const useSchedule = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<View>('week')
  const [staffFilter, setStaffFilter] = useState<string | undefined>()

  // Selected appointment for detail dialog
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  // Slot selected for new appointment dialog
  const [newSlot, setNewSlot] = useState<{ start: Date; end: Date } | null>(null)

  const fetchRange = useCallback(
    async (start: Date, end: Date, staffId?: string) => {
      setIsLoading(true)
      try {
        const data = await scheduleApi.list(
          format(start, 'yyyy-MM-dd'),
          format(end, 'yyyy-MM-dd'),
          staffId,
        )
        setAppointments(data)
        setEvents(data.map(appointmentMapper.toCalendarEvent))
      } catch {
        toast.error('Erro ao carregar agenda')
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    const end = endOfWeek(currentDate, { weekStartsOn: 0 })
    fetchRange(start, end, staffFilter)
  }, [currentDate, staffFilter, fetchRange])

  const handleRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    const start = Array.isArray(range) ? range[0] : range.start
    const end   = Array.isArray(range) ? range[range.length - 1] : range.end
    fetchRange(start, end, staffFilter)
  }

  const reload = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    const end   = endOfWeek(currentDate, { weekStartsOn: 0 })
    fetchRange(start, end, staffFilter)
  }

  return {
    events, appointments, isLoading,
    currentDate, setCurrentDate,
    currentView, setCurrentView,
    staffFilter, setStaffFilter,
    selectedAppointment, setSelectedAppointment,
    newSlot, setNewSlot,
    handleRangeChange, reload,
  }
}

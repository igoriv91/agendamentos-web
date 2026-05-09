import { useCallback, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { scheduleApi } from '../schedule.api'
import { appointmentMapper } from '../mappers/appointment.mapper'
import type { Appointment, CalendarEvent } from '../types/appointment.types'

export const useSchedule = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
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
        // Don't clear events on error — keep showing the previous data
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchRange(currentDate, currentDate, staffFilter)
  }, [currentDate, staffFilter, fetchRange])

  // Track last date to avoid refetching on every calendar re-render
  const lastDateRef = useRef<string | null>(null)

  const handleRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    const start = Array.isArray(range) ? range[0] : range.start
    const key = format(start, 'yyyy-MM-dd')
    if (lastDateRef.current === key) return
    lastDateRef.current = key
    fetchRange(start, start, staffFilter)
  }

  const reload = () => {
    lastDateRef.current = null
    fetchRange(currentDate, currentDate, staffFilter)
  }

  return {
    events, appointments, isLoading,
    currentDate, setCurrentDate,
    staffFilter, setStaffFilter,
    selectedAppointment, setSelectedAppointment,
    newSlot, setNewSlot,
    handleRangeChange, reload,
  }
}

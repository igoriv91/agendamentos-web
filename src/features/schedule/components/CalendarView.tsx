import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AppointmentCard } from './AppointmentCard'
import { CalendarToolbar } from './CalendarToolbar'
import type { CalendarEvent } from '../types/appointment.types'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (d: Date) => startOfWeek(d, { weekStartsOn: 0 }),
  getDay,
  locales: { 'pt-BR': ptBR },
})

interface CalendarViewProps {
  events: CalendarEvent[]
  currentDate: Date
  onNavigate: (date: Date) => void
  onRangeChange: (range: Date[] | { start: Date; end: Date }) => void
  onSelectEvent: (event: CalendarEvent) => void
  onSelectSlot: (slot: { start: Date; end: Date }) => void
}

export const CalendarView = ({
  events, currentDate,
  onNavigate, onRangeChange, onSelectEvent, onSelectSlot,
}: CalendarViewProps) => {
  const components = useMemo(() => ({
    toolbar: ({ date, onNavigate: nav }: { date: Date; onNavigate: (a: 'PREV' | 'NEXT' | 'TODAY') => void }) => (
      <CalendarToolbar date={date} onNavigate={nav} />
    ),
    event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} />,
    day:   { event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} /> },
  }), [])

  const minTime = useMemo(() => { const d = new Date(); d.setHours(6,0,0,0);  return d }, [])
  const maxTime = useMemo(() => { const d = new Date(); d.setHours(22,0,0,0); return d }, [])

  return (
    <div className="rbc-timeline h-full">
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        date={currentDate}
        view="day"
        views={['day']}
        onView={() => {}}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        culture="pt-BR"
        messages={{ noEventsInRange: '', allDay: '' }}
        components={components}
        style={{ height: '100%' }}
        step={30}
        timeslots={2}
        min={minTime}
        max={maxTime}
      />
    </div>
  )
}

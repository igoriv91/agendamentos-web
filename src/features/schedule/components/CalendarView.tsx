import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer, type View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AppointmentCard } from './AppointmentCard'
import type { CalendarEvent } from '../types/appointment.types'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (d: Date) => startOfWeek(d, { weekStartsOn: 0 }),
  getDay,
  locales: { 'pt-BR': ptBR },
})

const MESSAGES = {
  today: 'Hoje', previous: '<', next: '>',
  month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Agenda',
  showMore: (n: number) => `+${n} mais`,
  noEventsInRange: 'Sem agendamentos neste período.',
  date: 'Data', time: 'Hora', event: 'Evento',
  allDay: 'Dia inteiro',
}

interface CalendarViewProps {
  events: CalendarEvent[]
  currentDate: Date
  currentView: View
  onNavigate: (date: Date) => void
  onView: (view: View) => void
  onRangeChange: (range: Date[] | { start: Date; end: Date }) => void
  onSelectEvent: (event: CalendarEvent) => void
  onSelectSlot: (slot: { start: Date; end: Date }) => void
}

export const CalendarView = ({
  events, currentDate, currentView,
  onNavigate, onView, onRangeChange, onSelectEvent, onSelectSlot,
}: CalendarViewProps) => {
  // Stable reference — prevents react-big-calendar from remounting events on every render
  const components = useMemo(() => ({
    event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} />,
    // week and day views use the same "event" key
    week: { event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} /> },
    day:  { event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} /> },
  }), [])

  // Use today's date for min/max so DST is handled correctly
  const minTime = useMemo(() => { const d = new Date(); d.setHours(6,0,0,0); return d }, [])
  const maxTime = useMemo(() => { const d = new Date(); d.setHours(22,0,0,0); return d }, [])

  return (
    <div className="h-full">
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        date={currentDate}
        view={currentView}
        onNavigate={onNavigate}
        onView={onView}
        onRangeChange={onRangeChange}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        culture="pt-BR"
        messages={MESSAGES}
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

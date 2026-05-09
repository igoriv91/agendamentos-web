import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
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
  day: 'Dia',
  showMore: (n: number) => `+${n} mais`,
  noEventsInRange: 'Sem agendamentos neste período.',
  date: 'Data', time: 'Hora', event: 'Evento',
  allDay: 'Dia inteiro',
}

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
    event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} />,
    day:   { event: ({ event }: { event: CalendarEvent }) => <AppointmentCard event={event} /> },
  }), [])

  const minTime = useMemo(() => { const d = new Date(); d.setHours(6,0,0,0); return d }, [])
  const maxTime = useMemo(() => { const d = new Date(); d.setHours(22,0,0,0); return d }, [])

  return (
    <div className="h-full">
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

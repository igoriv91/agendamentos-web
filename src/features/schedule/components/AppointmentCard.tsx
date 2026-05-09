import { cn } from '@/shared/lib/utils'
import type { CalendarEvent } from '../types/appointment.types'

const STATUS_COLOR: Record<string, string> = {
  pending:   'bg-yellow-100 border-yellow-400 text-yellow-800',
  confirmed: 'bg-blue-100 border-blue-400 text-blue-800',
  completed: 'bg-green-100 border-green-400 text-green-800',
  cancelled: 'bg-red-100 border-red-400 text-red-800',
}

interface Props {
  event: CalendarEvent
}

export const AppointmentCard = ({ event }: Props) => {
  const { resource } = event
  const color = STATUS_COLOR[resource.status] ?? STATUS_COLOR['pending']

  return (
    <div className={cn('h-full rounded border-l-4 px-1 py-0.5 text-xs leading-tight', color)}>
      <div className="font-medium truncate">{resource.clientName}</div>
      <div className="truncate opacity-80">{resource.serviceName}</div>
      <div className="opacity-70">{resource.staffName}</div>
    </div>
  )
}

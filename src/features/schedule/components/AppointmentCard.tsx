import { cn } from '@/shared/lib/utils'
import type { CalendarEvent } from '../types/appointment.types'

interface Props {
  event: CalendarEvent
}

// Static class strings (not dynamic) so Tailwind v4 scanner includes them in the bundle
export const AppointmentCard = ({ event }: Props) => {
  const { resource } = event
  const s = resource.status

  return (
    <div className={cn(
      'h-full overflow-hidden rounded border-l-4 px-1 py-0.5 text-xs leading-tight',
      s === 'pending'   && 'bg-yellow-100 border-yellow-400 text-yellow-800',
      s === 'confirmed' && 'bg-blue-100   border-blue-400   text-blue-800',
      s === 'completed' && 'bg-green-100  border-green-400  text-green-800',
      s === 'cancelled' && 'bg-red-100    border-red-400    text-red-800',
      !['pending','confirmed','completed','cancelled'].includes(s) && 'bg-yellow-100 border-yellow-400 text-yellow-800',
    )}>
      <div className="font-medium truncate">{resource.clientName}</div>
      <div className="truncate opacity-80">{resource.serviceName}</div>
      <div className="opacity-70 truncate">{resource.staffName}</div>
    </div>
  )
}

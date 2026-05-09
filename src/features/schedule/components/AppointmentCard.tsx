import { cn } from '@/shared/lib/utils'
import type { CalendarEvent } from '../types/appointment.types'

interface Props {
  event: CalendarEvent
}

// MD3 Tonal containers — fundo suave, texto com cor no mesmo hue
export const AppointmentCard = ({ event }: Props) => {
  const { resource } = event
  const s = resource.status

  return (
    <div className={cn(
      'h-full overflow-hidden rounded-lg border-l-[3px] px-2 py-1 text-xs leading-tight',
      s === 'pending'   && 'bg-[oklch(0.95_0.07_85)]  border-[oklch(0.65_0.14_80)]  text-[oklch(0.35_0.12_75)]',
      s === 'confirmed' && 'bg-[oklch(0.92_0.06_264)] border-[oklch(0.50_0.16_264)] text-[oklch(0.30_0.16_264)]',
      s === 'completed' && 'bg-[oklch(0.93_0.07_143)] border-[oklch(0.55_0.17_143)] text-[oklch(0.28_0.13_143)]',
      s === 'cancelled' && 'bg-[oklch(0.93_0.05_27)]  border-[oklch(0.55_0.18_27)]  text-[oklch(0.35_0.14_27)]',
      !['pending','confirmed','completed','cancelled'].includes(s) &&
        'bg-[oklch(0.95_0.07_85)] border-[oklch(0.65_0.14_80)] text-[oklch(0.35_0.12_75)]',
    )}>
      <div className="font-semibold truncate">{resource.clientName}</div>
      <div className="truncate opacity-80">{resource.serviceName}</div>
      <div className="opacity-60 truncate text-[10px]">{resource.staffName}</div>
    </div>
  )
}

import { format, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface Props {
  date: Date
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void
}

export const CalendarToolbar = ({ date, onNavigate }: Props) => {
  const today = isToday(date)
  const dayNum  = format(date, 'd')
  const dayName = format(date, 'EEE', { locale: ptBR })           // sáb
  const monthYear = format(date, 'MMMM yyyy', { locale: ptBR })   // maio 2026

  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b bg-card select-none">
      {/* Prev */}
      <button
        onClick={() => onNavigate('PREV')}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Day circle + month/year */}
      <div className="flex flex-1 items-center gap-2">
        <button
          onClick={() => onNavigate('TODAY')}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold transition-colors',
            today
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted',
          )}
        >
          {dayNum}
        </button>
        <div className="leading-tight">
          <p className="text-sm font-medium capitalize text-foreground">{dayName}</p>
          <p className="text-xs text-muted-foreground capitalize">{monthYear}</p>
        </div>
      </div>

      {/* Hoje — só aparece quando não é hoje */}
      {!today && (
        <button
          onClick={() => onNavigate('TODAY')}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Hoje
        </button>
      )}

      {/* Next */}
      <button
        onClick={() => onNavigate('NEXT')}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

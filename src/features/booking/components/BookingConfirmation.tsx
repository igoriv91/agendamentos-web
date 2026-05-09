import { CheckCircle2, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/shared/components/ui/button'

interface Props {
  serviceName: string
  staffName: string
  selectedDate: string
  selectedSlot: string
  companyName: string
  onNewBooking: () => void
}

export const BookingConfirmation = ({
  serviceName, staffName, selectedDate, selectedSlot, companyName, onNewBooking,
}: Props) => {
  const dateLabel = format(
    new Date(`${selectedDate}T12:00:00`),
    "EEEE, d 'de' MMMM 'de' yyyy",
    { locale: ptBR },
  )

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Agendamento confirmado!</h2>
        <p className="text-muted-foreground mt-1">Até logo em {companyName}</p>
      </div>

      <div className="w-full max-w-xs rounded-xl border bg-card p-4 text-left space-y-2 text-sm">
        <div className="flex items-center gap-2 text-primary font-medium mb-3">
          <Calendar className="h-4 w-4" />
          <span>Detalhes do agendamento</span>
        </div>
        <Row label="Serviço"    value={serviceName} />
        <Row label="Atendente"  value={staffName} />
        <Row label="Data"       value={<span className="capitalize">{dateLabel}</span>} />
        <Row label="Horário"    value={selectedSlot} />
      </div>

      <Button variant="outline" onClick={onNewBooking}>
        Fazer outro agendamento
      </Button>
    </div>
  )
}

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between gap-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
)

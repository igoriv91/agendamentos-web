import { Scissors } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import type { BookingService } from '../types/booking.types'

interface Props {
  serviceList: BookingService[]
  staffName: string
  onSelect: (service: BookingService) => void
  onBack: () => void
}

export const ServiceSelector = ({ serviceList, staffName, onSelect, onBack }: Props) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>
      <h2 className="text-lg font-semibold">Escolha o serviço</h2>
    </div>
    <p className="text-sm text-muted-foreground">Atendente: <strong>{staffName}</strong></p>
    <div className="grid gap-3 sm:grid-cols-2">
      {serviceList.map((s) => (
        <Card
          key={s.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => onSelect(s)}
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Scissors className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.durationMinutes} min{s.price ? ` · ${formatCurrency(parseFloat(s.price))}` : ''}</p>
              {s.description && <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

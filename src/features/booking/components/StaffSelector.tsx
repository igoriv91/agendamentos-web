import { User } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { BookingStaff } from '../types/booking.types'

interface Props {
  staffList: BookingStaff[]
  onSelect: (staff: BookingStaff) => void
}

export const StaffSelector = ({ staffList, onSelect }: Props) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold">Escolha o atendente</h2>
    <div className="grid gap-3 sm:grid-cols-2">
      {staffList.map((s) => (
        <Card
          key={s.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => onSelect(s)}
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{s.name}</p>
              {s.phone && <p className="text-sm text-muted-foreground">{s.phone}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

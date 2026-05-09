import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { AppButton } from '@/shared/components/custom/AppButton'
import { useAppointmentActions } from '../hooks/useAppointmentActions'
import type { Appointment } from '../types/appointment.types'

interface Props {
  appointment: Appointment | null
  onClose: () => void
  onDone: () => void
  onEdit: (appointment: Appointment) => void
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendente', confirmed: 'Confirmado',
  completed: 'Realizado', cancelled: 'Cancelado',
}

export const AppointmentDetail = ({ appointment, onClose, onDone, onEdit }: Props) => {
  const { isLoading, confirm, complete, cancel } = useAppointmentActions(() => {
    onDone()
    onClose()
  })

  if (!appointment) return null

  return (
    <Dialog open={!!appointment} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <Row label="Cliente"    value={appointment.clientName} />
          <Row label="Telefone"   value={appointment.clientPhone || '—'} />
          <Row label="Atendente"  value={appointment.staffName} />
          <Row label="Serviço"    value={appointment.serviceName} />
          <Row
            label="Data/hora"
            value={format(appointment.scheduledAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          />
          <Row label="Duração"    value={`${appointment.durationMinutes} min`} />
          {appointment.notes && <Row label="Observações" value={appointment.notes} />}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-24">Status</span>
            <StatusBadge
              status={appointment.status as never}
              label={STATUS_LABEL[appointment.status] ?? appointment.status}
            />
          </div>
        </div>

        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              size="sm" variant="outline"
              disabled={isLoading}
              onClick={() => { onClose(); onEdit(appointment) }}
            >
              Editar
            </Button>
            {appointment.status === 'pending' && (
              <AppButton size="sm" isLoading={isLoading} onClick={() => confirm(appointment.id)}>
                Confirmar
              </AppButton>
            )}
            <AppButton
              size="sm" variant="secondary"
              isLoading={isLoading}
              onClick={() => complete(appointment.id)}
            >
              Marcar realizado
            </AppButton>
            <Button
              size="sm" variant="destructive"
              disabled={isLoading}
              onClick={() => cancel(appointment.id)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <span className="text-muted-foreground w-24 shrink-0">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
)

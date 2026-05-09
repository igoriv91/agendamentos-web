import { formatRelative } from '@/shared/lib/formatDate'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { Notification } from '../types/notification.types'

const TYPE_LABEL: Record<string, string> = {
  new_appointment:      '📅 Novo agendamento',
  changed_appointment:  '✏️ Agendamento alterado',
  cancelled_appointment:'❌ Agendamento cancelado',
  payment_due:          '💳 Pagamento próximo',
  payment_blocked:      '🚫 Acesso bloqueado',
}

interface Props {
  notifications: Notification[]
  onMarkAllRead: () => void
  onClose: () => void
}

export const NotificationPanel = ({ notifications, onMarkAllRead }: Omit<Props, 'onClose'> & { onClose?: () => void }) => (
  <div className="flex flex-col" style={{ maxHeight: '70vh' }}>
    <div className="flex items-center justify-between border-b p-3">
      <span className="font-semibold text-sm">Notificações</span>
      <Button variant="ghost" size="sm" onClick={onMarkAllRead}>
        Marcar todas como lidas
      </Button>
    </div>

    <div className="overflow-y-auto flex-1">
      {notifications.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">
          Nenhuma notificação
        </p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              'border-b px-4 py-3 text-sm',
              !n.isRead && 'bg-primary/5',
            )}
          >
            <p className="font-medium text-xs text-muted-foreground mb-0.5">
              {TYPE_LABEL[n.type] ?? n.type}
            </p>
            <p>{n.message}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatRelative(n.createdAt)}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
)

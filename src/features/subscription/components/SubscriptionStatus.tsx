import { CreditCard, Users, Calendar, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { AppButton } from '@/shared/components/custom/AppButton'
import { StatusBadge } from '@/shared/components/custom/StatusBadge'
import { Button } from '@/shared/components/ui/button'
import { formatDate } from '@/shared/lib/formatDate'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { useSubscription } from '../hooks/useSubscription'

const STATUS_LABEL: Record<string, string> = {
  active:  'Ativo',
  overdue: 'Vencido',
  grace:   'Carência',
  blocked: 'Bloqueado',
}

export const SubscriptionStatus = () => {
  const { subscription, isLoading, isCheckingOut, handleCheckout } = useSubscription()

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!subscription) return null

  const isBlocked = subscription.status === 'blocked'
  const needsPayment = subscription.status !== 'active'

  return (
    <div className="space-y-4">
      {needsPayment && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm text-destructive">
              {isBlocked ? 'Acesso bloqueado' : 'Pagamento pendente'}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isBlocked
                ? 'Realize o pagamento para reativar o acesso.'
                : `Seu plano venceu. Período de carência até ${formatDate(subscription.gracePeriodEnd)}.`}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />Plano
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{subscription.maxStaff} atendentes</p>
            <p className="text-sm text-muted-foreground">{subscription.planSlots} bloco{subscription.planSlots > 1 ? 's' : ''}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />Mensalidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(subscription.monthlyPrice)}</p>
            <p className="text-sm text-muted-foreground">por mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />Vencimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatDate(subscription.dueDate)}</p>
            <StatusBadge
              status={subscription.status as never}
              label={STATUS_LABEL[subscription.status] ?? subscription.status}
              className="mt-1"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <AppButton
          onClick={() => handleCheckout(subscription.planSlots)}
          isLoading={isCheckingOut}
        >
          {needsPayment ? 'Pagar agora' : 'Renovar plano'}
        </AppButton>

        <Button
          variant="outline"
          onClick={() => handleCheckout(subscription.planSlots + 1)}
          disabled={isCheckingOut}
        >
          Adicionar +5 atendentes (+R$ 50/mês)
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        O pagamento é processado pelo MercadoPago. Após a confirmação, o plano é renovado automaticamente.
      </p>
    </div>
  )
}

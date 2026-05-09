import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { subscriptionApi, type Subscription } from '../subscription.api'

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading,    setIsLoading]    = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    subscriptionApi.getMe()
      .then(setSubscription)
      .catch(() => toast.error('Erro ao carregar assinatura'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleCheckout = async (planSlots: number) => {
    setIsCheckingOut(true)
    try {
      const { checkoutUrl } = await subscriptionApi.checkout(planSlots)
      window.open(checkoutUrl, '_blank')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao abrir pagamento')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return { subscription, isLoading, isCheckingOut, handleCheckout }
}

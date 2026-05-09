import { useState } from 'react'
import { toast } from 'sonner'
import { scheduleApi } from '../schedule.api'

export const useAppointmentActions = (onDone: () => void) => {
  const [isLoading, setIsLoading] = useState(false)

  const run = async (fn: () => Promise<void>, successMsg: string) => {
    setIsLoading(true)
    try {
      await fn()
      toast.success(successMsg)
      onDone()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    confirm:  (id: string) => run(() => scheduleApi.updateStatus(id, 'confirmed'),  'Agendamento confirmado'),
    complete: (id: string) => run(() => scheduleApi.updateStatus(id, 'completed'),  'Marcado como realizado'),
    cancel:   (id: string) => run(() => scheduleApi.updateStatus(id, 'cancelled', 'company'), 'Agendamento cancelado'),
  }
}

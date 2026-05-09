import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { servicesApi } from '../services.api'
import type { Service } from '../types/service.types'

export const useServices = () => {
  const { navigateTo } = useAppNavigate()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const load = async () => {
    setIsLoading(true)
    try { setServices(await servicesApi.list()) }
    catch { toast.error('Erro ao carregar serviços') }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    try {
      await servicesApi.remove(id)
      toast.success('Serviço desativado')
      load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao remover')
    }
  }

  return {
    services, isLoading,
    handleDelete,
    navigateToCreate: () => navigateTo('/services/new'),
    navigateToEdit: (id: string) => navigateTo(`/services/${id}`),
  }
}

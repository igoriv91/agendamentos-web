import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { staffApi } from '../staff.api'
import type { Staff } from '../types/staff.types'

export const useStaff = () => {
  const { navigateTo } = useAppNavigate()
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const load = async () => {
    setIsLoading(true)
    try {
      setStaff(await staffApi.list())
    } catch {
      toast.error('Erro ao carregar atendentes')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    try {
      await staffApi.remove(id)
      toast.success('Atendente removido')
      load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao remover')
    }
  }

  return {
    staff,
    isLoading,
    reload: load,
    handleDelete,
    navigateToCreate: () => navigateTo('/staff/new'),
    navigateToEdit: (id: string) => navigateTo(`/staff/${id}`),
  }
}

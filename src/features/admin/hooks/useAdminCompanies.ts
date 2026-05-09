import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { adminApi } from '../admin.api'
import type { AdminCompany, AdminStats } from '../types/admin.types'

export const useAdminCompanies = () => {
  const [companies, setCompanies] = useState<AdminCompany[]>([])
  const [stats,     setStats]     = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const load = async () => {
    setIsLoading(true)
    try {
      const [companiesData, statsData] = await Promise.all([
        adminApi.listCompanies(),
        adminApi.getStats(),
      ])
      setCompanies(companiesData)
      setStats(statsData)
    } catch {
      toast.error('Erro ao carregar dados')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleBlock = async (id: string) => {
    try {
      await adminApi.updateStatus(id, 'blocked')
      toast.success('Empresa bloqueada')
      load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao bloquear')
    }
  }

  const handleActivate = async (id: string) => {
    try {
      await adminApi.updateStatus(id, 'active')
      toast.success('Empresa reativada')
      load()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao reativar')
    }
  }

  return { companies, stats, isLoading, handleBlock, handleActivate }
}

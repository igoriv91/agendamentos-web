import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { staffApi } from '@/features/staff/staff.api'
import type { Staff } from '@/features/staff/types/staff.types'
import { servicesApi } from '../services.api'
import { serviceSchema, type ServiceFormData } from '../schemas/service.schema'

export const useServiceForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { navigateTo } = useAppNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [staffList, setStaffList] = useState<Staff[]>([])

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: '', durationMinutes: 30, description: '', staffId: '' },
  })

  useEffect(() => {
    staffApi.list().then(setStaffList)
    if (!isEdit) return
    servicesApi.getById(id).then((s) =>
      form.reset({
        name: s.name,
        durationMinutes: s.durationMinutes,
        description: s.description ?? '',
        price: s.price ? parseFloat(s.price) : undefined,
        staffId: s.staffId ?? '',
      }),
    )
  }, [id, isEdit, form])

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const payload = {
        ...data,
        staffId: data.staffId || undefined,
        description: data.description || undefined,
      }
      if (isEdit) { await servicesApi.update(id, payload); toast.success('Serviço atualizado') }
      else { await servicesApi.create(payload); toast.success('Serviço criado') }
      navigateTo('/services')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading, isEdit, staffList }
}

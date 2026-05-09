import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { staffApi } from '../staff.api'
import { staffSchema, type StaffFormData } from '../schemas/staff.schema'

export const useStaffForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const { navigateTo } = useAppNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  useEffect(() => {
    if (!isEdit) return
    staffApi.getById(id).then((s) =>
      form.reset({ name: s.name, email: s.email ?? '', phone: s.phone ?? '' }),
    )
  }, [id, isEdit, form])

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const payload = { ...data, email: data.email || undefined, phone: data.phone || undefined }
      if (isEdit) {
        await staffApi.update(id, payload)
        toast.success('Atendente atualizado')
      } else {
        await staffApi.create(payload)
        toast.success('Atendente criado')
      }
      navigateTo('/staff')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading, isEdit }
}

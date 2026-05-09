import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { staffApi } from '@/features/staff/staff.api'
import { servicesApi } from '@/features/services/services.api'
import type { Staff } from '@/features/staff/types/staff.types'
import type { Service } from '@/features/services/types/service.types'
import { scheduleApi } from '../schedule.api'

const schema = z.object({
  staffId:     z.string().min(1, 'Selecione o atendente'),
  serviceId:   z.string().min(1, 'Selecione o serviço'),
  scheduledAt: z.string().min(1, 'Informe data e hora'),
  clientName:  z.string().min(1, 'Nome do cliente é obrigatório'),
  clientPhone: z.string().min(1, 'Telefone é obrigatório'),
  notes:       z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof schema>

export const useAppointmentForm = (
  initialSlot: { start: Date; end: Date } | null,
  onSuccess: () => void,
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [staffList,   setStaffList]   = useState<Staff[]>([])
  const [serviceList, setServiceList] = useState<Service[]>([])

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      staffId: '', serviceId: '',
      scheduledAt: initialSlot ? format(initialSlot.start, "yyyy-MM-dd'T'HH:mm") : '',
      clientName: '', clientPhone: '', notes: '',
    },
  })

  const watchedStaffId = form.watch('staffId')

  useEffect(() => { staffApi.list().then(setStaffList) }, [])

  // Reset scheduledAt when slot changes
  useEffect(() => {
    if (initialSlot)
      form.setValue('scheduledAt', format(initialSlot.start, "yyyy-MM-dd'T'HH:mm"))
  }, [initialSlot, form])

  // Filter services by selected staff
  useEffect(() => {
    servicesApi.list().then((all) => {
      setServiceList(
        watchedStaffId
          ? all.filter((s) => !s.staffId || s.staffId === watchedStaffId)
          : all,
      )
    })
  }, [watchedStaffId])

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await scheduleApi.create({
        staffId:     data.staffId,
        serviceId:   data.serviceId,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
        clientName:  data.clientName,
        clientPhone: data.clientPhone,
        notes:       data.notes || undefined,
      })
      toast.success('Agendamento criado')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar agendamento')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading, staffList, serviceList }
}

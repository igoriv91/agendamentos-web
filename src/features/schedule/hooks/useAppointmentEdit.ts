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
import type { Appointment } from '../types/appointment.types'

const schema = z.object({
  staffId:     z.string().min(1, 'Selecione o atendente'),
  serviceId:   z.string().min(1, 'Selecione o serviço'),
  scheduledAt: z.string().min(1, 'Informe data e hora'),
  clientName:  z.string().min(1, 'Nome do cliente é obrigatório'),
  clientPhone: z.string().optional(),
  notes:       z.string().optional(),
})

export type AppointmentEditFormData = z.infer<typeof schema>

export const useAppointmentEdit = (
  appointment: Appointment | null,
  onSuccess: () => void,
) => {
  const [isLoading, setIsLoading]   = useState(false)
  const [staffList, setStaffList]   = useState<Staff[]>([])
  const [serviceList, setServiceList] = useState<Service[]>([])

  const form = useForm<AppointmentEditFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      staffId: '', serviceId: '', scheduledAt: '',
      clientName: '', clientPhone: '', notes: '',
    },
  })

  const watchedStaffId = form.watch('staffId')

  useEffect(() => { staffApi.list().then(setStaffList) }, [])

  useEffect(() => {
    if (!appointment) return
    form.reset({
      staffId:     appointment.staffId,
      serviceId:   appointment.serviceId,
      scheduledAt: format(appointment.scheduledAt, "yyyy-MM-dd'T'HH:mm"),
      clientName:  appointment.clientName,
      clientPhone: appointment.clientPhone ?? '',
      notes:       appointment.notes ?? '',
    })
  }, [appointment, form])

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
    if (!appointment) return
    setIsLoading(true)
    try {
      await scheduleApi.update(appointment.id, {
        staffId:     data.staffId,
        serviceId:   data.serviceId,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
        clientName:  data.clientName,
        clientPhone: data.clientPhone || undefined,
        notes:       data.notes || undefined,
      })
      toast.success('Agendamento atualizado')
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar agendamento')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading, staffList, serviceList }
}

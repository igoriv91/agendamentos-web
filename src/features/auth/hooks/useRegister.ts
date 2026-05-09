import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { authApi } from '../auth.api'
import {
  step1Schema, step2Schema,
  type Step1Data, type Step2Data,
  type StaffItem, type ServiceItem, type HoursItem,
} from '../schemas/auth.schema'

const DEFAULT_HOURS: HoursItem[] = [
  { dayOfWeek: 0, isOpen: false, openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 1, isOpen: true,  openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 2, isOpen: true,  openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 3, isOpen: true,  openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 4, isOpen: true,  openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 5, isOpen: true,  openTime: '08:00', closeTime: '18:00' },
  { dayOfWeek: 6, isOpen: false, openTime: '08:00', closeTime: '18:00' },
]

export const useRegister = () => {
  const { login } = useAuth()
  const { navigateTo } = useAppNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  // Dados acumulados por etapa
  const [step1, setStep1] = useState<Step1Data | null>(null)
  const [step2, setStep2] = useState<Step2Data | null>(null)
  const [staff,    setStaff]    = useState<StaffItem[]>([])
  const [services, setServices] = useState<ServiceItem[]>([])
  const [hours,    setHours]    = useState<HoursItem[]>(DEFAULT_HOURS)
  const [planSlots, setPlanSlots] = useState(1)
  const [trial, setTrial] = useState(true)

  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema),
    defaultValues: { userName: '', userEmail: '', password: '', confirmPassword: '' } })

  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema),
    defaultValues: { companyName: '', slug: '', companyEmail: '', companyPhone: '' } })

  const next1 = form1.handleSubmit((data) => { setStep1(data); setStep(2) })
  const next2 = form2.handleSubmit((data) => { setStep2(data); setStep(3) })

  const back = () => setStep((s) => Math.max(1, s - 1))
  const skip = () => setStep((s) => s + 1)

  const submit = async (selectedTrial: boolean, slots: number) => {
    if (!step1 || !step2) return
    setIsLoading(true)
    try {
      const result = await authApi.register({
        userName:     step1.userName,
        userEmail:    step1.userEmail,
        password:     step1.password,
        companyName:  step2.companyName,
        slug:         step2.slug,
        companyEmail: step2.companyEmail,
        companyPhone: step2.companyPhone,
        planSlots:    slots,
        trial:        selectedTrial,
        staff,
        services,
        businessHours: hours,
      })
      login(result.user, result.token)
      toast.success('Empresa cadastrada! Bem-vindo ao AgendAll 🎉')
      navigateTo('/schedule')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    step, back, skip,
    form1, next1,
    form2, next2,
    staff, setStaff,
    services, setServices,
    hours, setHours,
    planSlots, setPlanSlots,
    trial, setTrial,
    isLoading, submit,
  }
}

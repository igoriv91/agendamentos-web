import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { companyApi, type BusinessHourInput } from '../company.api'

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

const defaultHours = (): BusinessHourInput[] =>
  DAYS.map((_, i) => ({
    dayOfWeek: i,
    openTime: '08:00',
    closeTime: '18:00',
    isOpen: i > 0 && i < 6,
  }))

export const useBusinessHours = (staffId: string | undefined) => {
  const [hours, setHours] = useState<BusinessHourInput[]>(defaultHours())
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!staffId) return
    companyApi.getBusinessHours(staffId).then((data) => {
      if (!data.length) return
      setHours(
        DAYS.map((_, i) => {
          const found = data.find((h) => h.dayOfWeek === i)
          return found
            ? { dayOfWeek: i, openTime: found.openTime.slice(11, 16), closeTime: found.closeTime.slice(11, 16), isOpen: found.isOpen }
            : defaultHours()[i]
        }),
      )
    })
  }, [staffId])

  const handleChange = (index: number, field: keyof BusinessHourInput, value: string | boolean) => {
    setHours((prev) => prev.map((h, i) => i === index ? { ...h, [field]: value } : h))
  }

  const handleSave = async () => {
    if (!staffId) return
    setIsSaving(true)
    try {
      await companyApi.saveBusinessHours(staffId, hours)
      toast.success('Horários salvos')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar horários')
    } finally {
      setIsSaving(false)
    }
  }

  return { hours, dayNames: DAYS, handleChange, handleSave, isSaving }
}

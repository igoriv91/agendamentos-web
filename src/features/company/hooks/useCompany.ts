import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { companyApi, type Company } from '../company.api'

const companySchema = z.object({
  name:  z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
})

type CompanyFormData = z.infer<typeof companySchema>

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<CompanyFormData>({ resolver: zodResolver(companySchema) })

  useEffect(() => {
    setIsLoading(true)
    companyApi.getMe()
      .then((c) => { setCompany(c); form.reset({ name: c.name, email: c.email, phone: c.phone ?? '' }) })
      .catch(() => toast.error('Erro ao carregar dados da empresa'))
      .finally(() => setIsLoading(false))
  }, [form])

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSaving(true)
    try {
      const updated = await companyApi.update(data)
      setCompany(updated)
      toast.success('Dados atualizados com sucesso')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar')
    } finally {
      setIsSaving(false)
    }
  })

  const handleRegenerateToken = async () => {
    try {
      const { bookingLinkToken } = await companyApi.regenerateToken()
      setCompany((c) => c ? { ...c, bookingLinkToken } : c)
      toast.success('Link regenerado com sucesso')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao regenerar link')
    }
  }

  return { company, form, isLoading, isSaving, handleSubmit, handleRegenerateToken }
}

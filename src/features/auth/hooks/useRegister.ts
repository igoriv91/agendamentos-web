import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { authApi } from '../auth.api'
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema'

export const useRegister = () => {
  const { login } = useAuth()
  const { navigateTo } = useAppNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      slug: '',
      companyEmail: '',
      userName: '',
      userEmail: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const result = await authApi.register(data)
      login(result.user, result.token)
      toast.success('Empresa cadastrada com sucesso!')
      navigateTo('/schedule')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading }
}

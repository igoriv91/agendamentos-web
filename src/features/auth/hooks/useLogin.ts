import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/app/providers/AuthProvider'
import { useAppNavigate } from '@/shared/hooks/useAppNavigate'
import { authApi } from '../auth.api'
import { loginSchema, type LoginFormData } from '../schemas/auth.schema'

export const useLogin = () => {
  const { login } = useAuth()
  const { navigateTo } = useAppNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const result = await authApi.login(data)
      login(result.user, result.token)
      navigateTo(result.user.role === 'superadmin' ? '/admin' : '/schedule')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao entrar')
    } finally {
      setIsLoading(false)
    }
  })

  return { form, handleSubmit, isLoading }
}

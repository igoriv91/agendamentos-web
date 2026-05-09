import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const registerSchema = z.object({
  companyName: z.string().min(1, 'Nome da empresa é obrigatório').max(255),
  slug: z
    .string()
    .min(2, 'Identificador deve ter ao menos 2 caracteres')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Use apenas letras minúsculas, números e hífens'),
  companyEmail: z.string().min(1, 'E-mail da empresa é obrigatório').email('E-mail inválido'),
  userName: z.string().min(1, 'Seu nome é obrigatório').max(255),
  userEmail: z.string().min(1, 'Seu e-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

import { z } from 'zod'

export const staffSchema = z.object({
  name:  z.string().min(1, 'Nome é obrigatório').max(255),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
})

export type StaffFormData = z.infer<typeof staffSchema>

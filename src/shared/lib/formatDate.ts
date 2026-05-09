import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date | string, pattern = 'dd/MM/yyyy') =>
  format(new Date(date), pattern, { locale: ptBR })

export const formatDateTime = (date: Date | string) =>
  format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })

export const formatRelative = (date: Date | string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR })

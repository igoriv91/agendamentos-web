import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const variants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
  {
    variants: {
      status: {
        active:    'bg-green-100 text-green-700',
        pending:   'bg-yellow-100 text-yellow-700',
        blocked:   'bg-red-100 text-red-700',
        inactive:  'bg-gray-100 text-gray-600',
        cancelled: 'bg-red-100 text-red-700',
        confirmed: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        overdue:   'bg-orange-100 text-orange-700',
        grace:     'bg-orange-100 text-orange-700',
      },
    },
    defaultVariants: { status: 'pending' },
  },
)

interface StatusBadgeProps extends VariantProps<typeof variants> {
  label: string
  className?: string
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => (
  <span className={cn(variants({ status }), className)}>{label}</span>
)

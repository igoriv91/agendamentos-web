import { Loader2 } from 'lucide-react'
import { Button, type ButtonProps } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean
}

export const AppButton = ({
  isLoading,
  disabled,
  children,
  className,
  ...props
}: AppButtonProps) => (
  <Button disabled={isLoading || disabled} className={cn(className)} {...props}>
    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
)

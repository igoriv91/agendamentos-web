import { Bell } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useNotifications } from '../hooks/useNotifications'
import { NotificationPanel } from './NotificationPanel'

export const NotificationBell = () => {
  const {
    notifications, unreadCount,
    isOpen, handleOpen, handleClose,
    handleMarkAllRead,
  } = useNotifications()

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={isOpen ? handleClose : handleOpen}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className={cn(
            'absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center',
            'rounded-full bg-destructive text-[10px] font-bold text-white',
          )}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          />
          <div className="absolute right-0 top-10 z-50 w-80 rounded-lg border bg-background shadow-lg">
            <NotificationPanel
              notifications={notifications}
              onMarkAllRead={handleMarkAllRead}
              onClose={handleClose}
            />
          </div>
        </>
      )}
    </div>
  )
}

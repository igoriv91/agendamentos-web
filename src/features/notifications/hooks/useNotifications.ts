import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '@/app/providers/SocketProvider'
import { useAuth } from '@/app/providers/AuthProvider'
import { notificationsApi } from '../notifications.api'
import type { Notification } from '../types/notification.types'

const playSound = () => {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start()
    osc.stop(ctx.currentTime + 0.4)
  } catch {
    // Audio not available
  }
}

export const useNotifications = () => {
  const { isAuthenticated } = useAuth()
  const socket = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const loaded = useRef(false)

  const load = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      setNotifications(await notificationsApi.list())
    } catch {
      // ignore
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!loaded.current && isAuthenticated) {
      loaded.current = true
      load()
    }
  }, [isAuthenticated, load])

  // Listen for real-time notifications
  useEffect(() => {
    if (!socket) return

    const handleNew = (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev])
      playSound()
    }

    socket.on('notification:new', handleNew)
    return () => { socket.off('notification:new', handleNew) }
  }, [socket])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleMarkAllRead = async () => {
    await notificationsApi.markAllRead()
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  return {
    notifications, unreadCount,
    isOpen, handleOpen, handleClose,
    handleMarkAllRead,
  }
}

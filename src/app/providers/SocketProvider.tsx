import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useAuth } from './AuthProvider'

const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!user?.companyId) return

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: sessionStorage.getItem('token') },
    })

    socket.on('connect', () => {
      socket.emit('join', `company_${user.companyId}`)
    })

    socketRef.current = socket
    return () => { socket.disconnect() }
  }, [user?.companyId])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

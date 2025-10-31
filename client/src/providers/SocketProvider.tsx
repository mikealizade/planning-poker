'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSocket } from '../lib/socket'
import type { Socket } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState(() => getSocket())
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.connect()

    const handleConnect = () => {
      setIsConnected(true)
      console.log('✅ Connected to WebSocket:', socket.id)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      console.log('❌ Disconnected from WebSocket')
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [socket])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext)

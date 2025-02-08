'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'

type SessionData = {
  sessionId: string
  // sessionName: string
  // hostName: string
}

type AppContextType = {
  sessionData: SessionData
  setSessionData: React.Dispatch<React.SetStateAction<SessionData>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionData, setSessionData] = useState<SessionData>({ sessionId: '' })
  return <AppContext value={{ sessionData, setSessionData }}>{children}</AppContext>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return context
}

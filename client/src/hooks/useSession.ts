'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createSession, deleteSession } from '@/api/api'

export type Session = {
  id: string
  host_id: string
  hostName: string
  session_name: string
  created_at: Date
  status: string
}

export const useSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['createSession'] })
      const sessionId = data.id
      router.push(`/join/${sessionId}`)
    },
  })

  const deleteSessionMutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deleteSession'] })
    },
  })

  return { createSessionMutation, deleteSessionMutation }
}

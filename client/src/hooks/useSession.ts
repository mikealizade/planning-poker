'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createSession, deleteSession, updateSession } from '@/api/api'
import { useWebSocket } from './useWebSocket'

export const useSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showVotes, clearVotes } = useWebSocket()

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: ({ id }: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['createSession'] })
      const sessionId = id
      router.push(`/join/${sessionId}`)
    },
  })

  const updateSessionMutation = useMutation({
    mutationFn: updateSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['updateSession'] })
      console.log('🚀 ~ useSession ~ data:', data)
      if (data.is_votes_visible) {
        showVotes({ sessionId: data.id })
      } else {
        clearVotes({ sessionId: data.id })
      }
    },
  })

  const deleteSessionMutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deleteSession'] })
    },
  })

  return { createSessionMutation, deleteSessionMutation, updateSessionMutation }
}

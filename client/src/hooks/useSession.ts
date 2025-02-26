'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createSession, deleteSession } from '@/api/api'

export const useSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: ({ id }: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ['createSession'] })
      const sessionId = id
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

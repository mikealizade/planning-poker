'use client'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Participant } from './useParticipant'

export type Session = {
  id: string
  host_id: string
  hostName: string
  session_name: string
  created_at: Date
  status: string
}

const createSession = async ({ sessionName }: { sessionName: string }): Promise<Session> => {
  const response = await axios.post(`${apiUrl}/createSession`, { sessionName })
  return response.data
}

const deleteSession = async ({ id }: { id: string }): Promise<Session> => {
  const response = await axios.delete(`${apiUrl}/deleteSession/${id}`)
  return response.data
}

export const fetchSession = async ({
  sessionId,
}: {
  sessionId: string
}): Promise<{ sessionData: Session; participants: Participant[] }> => {
  const response = await axios.get(`${apiUrl}/fetchSession/${sessionId}`)
  return response.data
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
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['deleteSession'] })
      console.log('🚀 ~ useSession ~ deleteSession:', data)
    },
  })

  return { createSessionMutation, deleteSessionMutation }
}

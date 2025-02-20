'use client'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useWebSocket } from './useWebSocket'
import type { Session } from './useSession'

export type Participant = {
  id: string
  session_id: string
  is_host: boolean
  participant_name: string
  vote: string
  has_voted: boolean
  is_active: boolean
  role: string
}

const createParticipant = async (participant: Participant): Promise<Participant> => {
  const response = await axios.post(`${apiUrl}/createParticipant`, participant)
  return response.data
}

export const fetchParticipants = async ({
  sessionId,
}: {
  sessionId: string
}): Promise<{ sessionData: Session; participants: Participant[] }> => {
  const response = await axios.get(`${apiUrl}/fetchSession/${sessionId}`)
  return response.data
}

const deleteParticipant = async ({ id }: { id: string }): Promise<Participant> => {
  const response = await axios.delete(`${apiUrl}/leaveSession/${id}`)
  return response.data
}

export const useParticipant = ({ sessionId }: { sessionId: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { joinSession, leaveSession } = useWebSocket()

  const createParticipantMutation = useMutation({
    mutationFn: createParticipant,
    onSuccess: data => {
      console.log('🚀 ~ createParticipant ~ data:', data)
      queryClient.invalidateQueries({ queryKey: ['createParticipant'] })
      joinSession({ sessionId, userId: data.id, participantName: data.participant_name })
      router.push(`/session/${sessionId}`)
    },
  })

  const deleteParticipantMutation = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: data => {
      console.log('🚀 ~ deleteParticipant ~ data:', data)
      queryClient.invalidateQueries({ queryKey: ['deleteParticipant'] })
      leaveSession({ sessionId, userId: data.id, participantName: data.participant_name })
    },
  })

  return { createParticipantMutation, deleteParticipantMutation }
}

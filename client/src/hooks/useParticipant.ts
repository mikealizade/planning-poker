'use client'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useWebSocket } from './useWebSocket'
import type { Session } from './useSession'
import { mapParticpants } from '@/utils/functions'

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

type Vote = Pick<Participant, 'id' | 'session_id' | 'vote'>

const createParticipant = async (participant: Participant): Promise<Participant> => {
  const response = await axios.post(`${apiUrl}/createParticipant`, participant)
  return response.data
}

const createVote = async (vote: Vote): Promise<Participant> => {
  const response = await axios.patch(`${apiUrl}/createVote`, vote)
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
  const response = await axios.delete(`${apiUrl}/deleteParticipant/${id}`)
  return response.data
}

export const useParticipant = ({ sessionId }: { sessionId: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { joinSession, leaveSession, makeVote } = useWebSocket()

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

  const voteMutation = useMutation({
    mutationFn: createVote,
    onSuccess: participants => {
      console.log('🚀 ~ voteMutation ~ data:', participants)
      queryClient.invalidateQueries({ queryKey: ['createVote'] })
      makeVote({ sessionId, participants: mapParticpants(participants) })
    },
  })

  return { createParticipantMutation, deleteParticipantMutation, voteMutation }
}

'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { User, useWebSocket } from './useWebSocket'
import { mapParticpants } from '@/utils/functions'
import * as api from '@/api/api'
import * as ss from '@/utils/storage'

export type ParticipantDB = {
  id: string
  session_id: string
  is_host: boolean
  participant_name: string
  vote: string
  has_voted: boolean
  is_active: boolean
  role: string
  // avatar: string
}

export type Participant = Pick<User, 'userId' | 'participantName'> & { vote: string; avatar?: string }

export const useParticipant = ({ sessionId }: { sessionId: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { joinSession, leaveSession, makeVote } = useWebSocket()

  const createParticipantMutation = useMutation({
    mutationFn: api.createParticipant,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['createParticipant'] })
      joinSession({ sessionId, userId: data.id, participantName: data.participant_name, avatar: data.avatar })
      ss.storeCurrentUserId(data.id)
      router.push(`/session/${sessionId}`)
    },
  })

  const deleteParticipantMutation = useMutation({
    mutationFn: api.deleteParticipant,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['deleteParticipant'] })
      leaveSession({ sessionId, userId: data.id })
      ss.deleteCurrentUserId()
    },
  })

  const voteMutation = useMutation({
    mutationFn: api.createVote,
    onSuccess: (participants: ParticipantDB[]) => {
      queryClient.invalidateQueries({ queryKey: ['createVote'] })
      makeVote({ sessionId, participants: mapParticpants(participants) })
    },
  })

  return { createParticipantMutation, deleteParticipantMutation, voteMutation }
}

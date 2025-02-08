'use client'
import { useAppContext } from '@/providers/providers'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { hostname } from 'os'
import { useRouter } from 'next/navigation'

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

export const useParticipant = ({ sessionId }: { sessionId: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setSessionData } = useAppContext()

  const participantMutation = useMutation({
    mutationFn: createParticipant,
    onSuccess: data => {
      console.log('🚀 ~ createParticipant ~ data:', data)
      queryClient.invalidateQueries({ queryKey: ['participant'] })
      setSessionData(prevData => ({ ...prevData, hostname }))
      router.push(`/session/${sessionId}`)
    },
  })

  return participantMutation
}

'use client'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useAppContext } from '@/providers/providers'
import { Participant } from './useParticipant'

type Session = {
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

const leaveSession = async ({ id }: { id: string }): Promise<Session> => {
  const response = await axios.delete(`${apiUrl}/leaveSession`, {
    data: { id },
  })
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
  const params = useParams()
  console.log('🚀 ~ useSession ~ params:', params)
  const router = useRouter()
  const queryClient = useQueryClient()
  // const { setSessionData, sessionData } = useAppContext()

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      const sessionId = data.id
      // setSessionData({ sessionId: data.id })
      router.push(`/join/${sessionId}`)
    },
  })

  const leaveSessionMutation = useMutation({
    mutationFn: leaveSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      router.push(`/join/${params.id}`)
    },
  })

  return { createSessionMutation, leaveSessionMutation }
}

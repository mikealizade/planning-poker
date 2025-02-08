'use client'
// import { useAppContext } from '@/providers/providers'
import axios from 'axios'
import { apiUrl } from '@/components/CreateSession/CreateSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
// import { useState } from 'react'
import { useAppContext } from '@/providers/providers'

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

export const fetchSession = async ({ sessionId }: { sessionId: string }): Promise<Session> => {
  const response = await axios.get(`${apiUrl}/fetchSession/${sessionId}`)
  return response.data
}

export const useSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setSessionData } = useAppContext()
  // const [hostName, setHostName] = useState('')

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      const sessionId = data.id
      setSessionData({ sessionId: data.id })
      router.push(`/join/${sessionId}`)
    },
  })

  // const { data, error, isLoading } = useQuery(

  // const {
  //   data: sessionData,
  //   error,
  //   isLoading,
  //   refetch,
  // } = useQuery(
  //   ['fetchSession', id], // Query key includes the dynamic id
  //   () => fetchSession(id), // Fetch data with the id
  //   {
  //     enabled: !!id, // Only enable the query if `id` is truthy
  //   },
  // )

  return createSessionMutation
}

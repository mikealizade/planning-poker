'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/styles/Button.style'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAppContext } from '@/providers/providers'
export const apiUrl = process.env.NEXT_PUBLIC_API_URI
console.log('🚀 ~ apiUrl:', apiUrl)

type Session = {
  id: string
  host_id: string
  session_name: string
  created_at: Date
  status: string
}

// type Participant = {
//   id: string
//   session_id: string
//   participant_name: string
//   vote: string
//   has_voted: boolean
//   is_active: boolean
//   role: string
// }

const createSession = async ({ sessionName }: { sessionName: string }): Promise<Session> => {
  const response = await axios.post(`${apiUrl}/createSession`, { sessionName })
  return response.data
}

// const createParticipant = async (participant: Participant): Promise<Participant> => {
//   const response = await axios.post(`${apiUrl}/createParticipant`, participant)
//   return response.data
// }

export const CreateSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [sessionName, setSessionName] = useState('')
  const [hostName, setHostName] = useState('')
  const { sessionData, setSessionData } = useAppContext()
  console.log('🚀 ~ CreateSession ~ sessionData:', sessionData)

  const sessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      const sessionId = data.id
      setSessionData({ sessionId: data.id, sessionName: data.session_name, hostName })
      router.push(`/session/${sessionId}`)
    },
  })

  // const particiapntMutation = useMutation({
  //   mutationFn: createParticipant,
  //   onSuccess: data => {
  //     console.log('🚀 ~ createParticipant ~ data:', data)
  //     queryClient.invalidateQueries({ queryKey: ['participant'] })
  //     setSessionData(prevData => ({ ...prevData, hostname }))
  //   },
  // })

  const handleSubmit = () => {
    sessionMutation.mutate({ sessionName })
    // particiapntMutation.mutate({
    //   id: 'guest',
    //   session_id: '',
    //   participant_name: hostName,
    //   vote: '',
    //   has_voted: false,
    //   is_active: true,
    //   role: 'particpant',
    // })
  }

  const onAddHostName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostName(e.target.value)
  }

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  }

  return (
    <div>
      <h1>Start a session</h1>
      <div>
        <input type='text' name='hostname' value={hostName} placeholder='Your name' onChange={onAddHostName} />
      </div>
      <div>
        <input type='text' name='name' value={sessionName} onChange={onAddSessionName} />
        <Button onClick={handleSubmit}>Start session</Button>
      </div>
    </div>
  )
}

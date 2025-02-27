'use client'
import { Button } from '@/styles/Button.style'
import { useState } from 'react'
// import { useAppContext } from '@/providers/providers'
import { useSession } from '@/hooks/useSession'
// import { useParticipant } from '@/hooks/useParticipant'
export const apiUrl = process.env.NEXT_PUBLIC_API_URI
import { VotingButtons } from '../VotingButtons/VotingButtons'

export const CreateSession = () => {
  const [sessionName, setSessionName] = useState('')
  // const [hostName, setHostName] = useState('')
  // const { sessionData } = useAppContext()
  const { createSessionMutation } = useSession()
  // const { voteMutation } = useParticipant({ sessionId })
  const [votingType, setVotingType] = useState('')

  const onCreateSession = () => {
    createSessionMutation.mutate({ sessionName, votingType })
  }

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  }

  // const createVote = (vote: string) => {
  //   voteMutation.mutate({
  //     id: String(currentUserId),
  //     session_id: sessionId,
  //     vote,
  //   })
  // }

  return (
    <div>
      <h1>Start a session</h1>
      <div>
        <input type='text' name='name' value={sessionName} onChange={onAddSessionName} />
        <Button onClick={onCreateSession}>Start session</Button>
        <VotingButtons setVotingType={setVotingType} />
      </div>
    </div>
  )
}

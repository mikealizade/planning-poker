'use client'
import { Button } from '@/styles/Button.style'
import { useState } from 'react'
import { useSession } from '@/hooks/useSession'
import { VotingOptions } from '../VotingOptions/VotingOptions'
export const apiUrl = process.env.NEXT_PUBLIC_API_URI

export const CreateSession = () => {
  const [sessionName, setSessionName] = useState('')
  const { createSessionMutation } = useSession()
  const [votingType, setVotingType] = useState('')

  const onCreateSession = () => {
    createSessionMutation.mutate({ sessionName, votingType })
  }

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  }

  return (
    <div>
      <h1>Start a session</h1>
      <div>
        <input type='text' name='name' value={sessionName} onChange={onAddSessionName} />
        <Button onClick={onCreateSession} disabled={!votingType}>
          Start session
        </Button>
        <VotingOptions setVotingType={setVotingType} />
      </div>
    </div>
  )
}

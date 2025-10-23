'use client'
import { Button } from '@/styles/Styles.style'
import { PageTitle, CenteredContent, Input, CreateSessionContainer } from '@/styles/Styles.style'
import { useState } from 'react'
import { useSession } from '@/hooks/useSession'
import { VotingOptions } from '../VotingOptions/VotingOptions'

export const apiUrl = process.env.NEXT_PUBLIC_API_URI

export const CreateSession = () => {
  const [sessionName, setSessionName] = useState('New session')
  const { createSessionMutation } = useSession()
  const [votingType, setVotingType] = useState('')

  const onCreateSession = () => {
    createSessionMutation.mutate({ sessionName, votingType })
  }

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  }

  return (
    <CenteredContent>
      <PageTitle>Start a session</PageTitle>
      <CreateSessionContainer>
        <Input type='text' name='name' value={sessionName} onChange={onAddSessionName} placeholder='Enter session name'></Input>
        <VotingOptions setVotingType={setVotingType} />
        <Button onClick={onCreateSession} disabled={!votingType}>
          Start session
        </Button>
      </CreateSessionContainer>
    </CenteredContent>
  )
}

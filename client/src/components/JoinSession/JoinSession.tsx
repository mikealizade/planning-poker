'use client'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Styles.style'

import { PageTitle, CenteredContent, Input, CreateSessionContainer } from '@/styles/Styles.style'

export const JoinSession = ({ sessionId }: { sessionId: string }) => {
  const [name, setName] = useState('Mike')
  const { createParticipantMutation } = useParticipant({ sessionId })

  const createParticipant = () => {
    createParticipantMutation.mutate({
      id: uuidv4(),
      session_id: sessionId,
      is_host: false,
      participant_name: name,
      vote: '',
      has_voted: false,
      is_active: true,
      role: 'particpant',
    })
  }

  const onJoinSession = () => {
    createParticipant()
  }

  const onEnterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    // <div>
    //   <h1>Join session</h1>
    //   <div>
    //     <input type='text' name='name' value={name} onChange={onEnterName} />
    //     <Button onClick={onJoinSession}>Join session</Button>
    //   </div>
    // </div>
    <CenteredContent>
      <PageTitle>Join session</PageTitle>
      <CreateSessionContainer>
        <Input type='text' name='name' value={name} onChange={onEnterName} placeholder='Enter your name'></Input>
        <Button onClick={onJoinSession} disabled={!name}>
          Join session
        </Button>
      </CreateSessionContainer>
    </CenteredContent>
  )
}

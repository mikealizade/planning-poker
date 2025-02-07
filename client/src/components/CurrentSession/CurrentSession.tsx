'use client'
import { v4 as uuidv4 } from 'uuid'
import { useAppContext } from '@/providers/providers'
import { useCallback, useState } from 'react'
import { useParticipant } from '@/hooks/useParticipant'

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const [isParticipantCreated, setIsParticpantCreated] = useState(false)
  const participantMutation = useParticipant(setIsParticpantCreated)
  const { sessionData } = useAppContext()

  const onCreateParticipant = useCallback(() => {
    participantMutation.mutate({
      id: `guest-${uuidv4()}`,
      session_id: sessionId,
      participant_name: sessionData.hostName,
      vote: '',
      has_voted: false,
      is_active: true,
      role: 'particpant',
    })
  }, [sessionId, participantMutation, sessionData.hostName])

  if (sessionId && !participantMutation.isPending && !participantMutation.isSuccess) {
    onCreateParticipant()
  }

  return (
    <>
      {isParticipantCreated && <div> Host name: {sessionData.hostName}</div>}
      <div>Session name: {sessionData.sessionName}</div>
      <div>Session id: {sessionId}</div>
    </>
  )
}

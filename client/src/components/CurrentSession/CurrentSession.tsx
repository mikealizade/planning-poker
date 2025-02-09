'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchSession, useSession } from '@/hooks/useSession'
import type { Participant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const {
    data: { sessionData, participants = [] } = {},
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  console.log('🚀 ~ CurrentSession ~ sessionData:', sessionData, participants)

  const { leaveSessionMutation } = useSession()

  const onLeaveSession = (id: string) => () => {
    leaveSessionMutation.mutate({ id })
  }

  return (
    <>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        Participants:
        <ul>
          {participants.map(({ id, participant_name }: Pick<Participant, 'id' | 'participant_name'>) => (
            <li key={id}>
              {participant_name} <Button onClick={onLeaveSession(id)}>Leave session</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

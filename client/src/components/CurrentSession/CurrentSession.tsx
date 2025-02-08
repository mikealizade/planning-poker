'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/hooks/useSession'
import type { Participant } from '@/hooks/useParticipant'

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

  return (
    <>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        Participants:
        <ul>
          {participants.map(({ id, participant_name }: Pick<Participant, 'id' | 'participant_name'>) => (
            <li key={id}>{participant_name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

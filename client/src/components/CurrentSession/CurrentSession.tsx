'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/hooks/useSession'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'
import { useAppContext } from '@/providers/providers'
import type { Participant, ParticipantDB } from '@/hooks/useWebSocket'
import Link from 'next/link'
import { mapParticpants } from '@/utils/functions'

const VotingButtons = ({ sessionId, userId }: { sessionId: string; userId: string }) => {
  const { voteMutation } = useParticipant({ sessionId })

  const createVote = (vote: string) => {
    voteMutation.mutate({
      id: userId,
      session_id: sessionId,
      vote,
    })
  }

  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  return (
    <ul>
      {['1', '2', '3', '5', '8'].map(vote => (
        <li key={vote}>
          <button onClick={onVote(vote)}>{vote}</button>
        </li>
      ))}
    </ul>
  )
}

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const { data: { sessionData, participants: dbParticipants = [] } = {} } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  const {
    sessionData: { participants: wsParticipants, currentUserId },
  } = useAppContext()
  const { deleteParticipantMutation } = useParticipant({ sessionId })
  // const participants = !dbParticipants.length ? [] : wsParticipants
  // const participants = !wsParticipants.length && sessionData?.id ? mapParticpants(dbParticipants as ParticipantDB[]) : wsParticipants
  // const participants = !dbParticipants.length ? mapParticpants(dbParticipants as ParticipantDB[]) : wsParticipants
  const participants =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length
      ? mapParticpants(dbParticipants as ParticipantDB[])
      : wsParticipants
  console.log('🚀 ~ CurrentSession ~ participants:', participants)

  const onLeaveSession = (id: string) => () => {
    console.log(`🚀 Leaving session: ${sessionId}, User: ${id}`)
    deleteParticipantMutation.mutate({ id })
  }
  const isVotesVisible = false
  return (
    <>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <VotingButtons sessionId={sessionId} userId={currentUserId} />
      <div>
        Participants:
        <ul>
          {participants?.map(({ userId, participantName, vote }: Participant) => {
            const curentVote = vote ? (userId !== currentUserId ? (isVotesVisible ? vote : '?') : vote) : 'no vote'
            return (
              <li key={Math.random()}>
                {participantName}
                {curentVote}
                {userId === currentUserId && (
                  <>
                    {/* {vote && <>Vote: {vote}</>} */}
                    <Button onClick={onLeaveSession(userId)}>Leave session</Button>
                  </>
                )}
                {}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

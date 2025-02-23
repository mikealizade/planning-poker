'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/hooks/useSession'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'
import { useAppContext } from '@/providers/providers'
import { useWebSocket, type Participant, type ParticipantDB } from '@/hooks/useWebSocket'
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
  const { showVotes, clearVotes } = useWebSocket()

  const {
    sessionData: { participants: wsParticipants, currentUserId, isVotesVisible, isVotesCleared },
  } = useAppContext()
  const { deleteParticipantMutation } = useParticipant({ sessionId })
  const participantsData =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length
      ? mapParticpants(dbParticipants as ParticipantDB[])
      : wsParticipants
  const userName = participantsData.find(({ userId }) => userId === currentUserId)?.participantName

  console.log('🚀 ~ CurrentSession ~ participantsData:', participantsData)
  const onLeaveSession = (id: string) => () => {
    deleteParticipantMutation.mutate({ id })
  }

  const onShowVotes = () => {
    showVotes({ sessionId })
  }

  const onClearVotes = () => {
    clearVotes({ sessionId })
  }

  return (
    <>
      <div> {userName}</div>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <Button onClick={onShowVotes}>Show votes</Button>
      <Button onClick={onClearVotes}>Cear votes</Button>
      <VotingButtons sessionId={sessionId} userId={currentUserId} />
      <div>
        Participants:
        <ul>
          {participantsData?.map(({ userId, participantName, vote }: Participant) => {
            const curentVote = isVotesCleared
              ? ''
              : vote
                ? userId !== currentUserId
                  ? isVotesVisible
                    ? vote
                    : ' ? '
                  : vote
                : ' no vote '
            return (
              <li key={Math.random()}>
                {participantName}
                {curentVote}
                {userId === currentUserId && <Button onClick={onLeaveSession(userId)}>Leave session</Button>}
                {}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

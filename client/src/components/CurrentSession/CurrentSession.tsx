'use client'
import { useQuery } from '@tanstack/react-query'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'
import { useAppContext } from '@/providers/providers'
import { useWebSocket } from '@/hooks/useWebSocket'
import { type Participant } from '@/hooks/useParticipant'
import Link from 'next/link'
import { mapParticpants } from '@/utils/functions'
import { fetchSession } from '@/api/api'

const VotingButtons = ({ createVote }: { createVote: (vote: string) => void }) => {
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
    sessionData: { participants: wsParticipants, currentUserId = window.sessionStorage.getItem('currentUserId'), isVotesVisible },
  } = useAppContext()
  const { showVotes, clearVotes } = useWebSocket()
  const { deleteParticipantMutation, voteMutation } = useParticipant({ sessionId })
  const participantsData: Participant[] =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length ? mapParticpants(dbParticipants) : wsParticipants
  const userName = participantsData.find(({ userId }) => userId === currentUserId)?.participantName

  const onLeaveSession = (id: string) => () => {
    deleteParticipantMutation.mutate({ id })
  }

  const createVote = (vote: string) => {
    voteMutation.mutate({
      id: String(currentUserId),
      session_id: sessionId,
      vote,
    })
  }

  const onShowVotes = () => {
    showVotes({ sessionId })
  }

  const onClearVotes = () => {
    createVote('')
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
      <VotingButtons createVote={createVote} />
      <div>
        Participants:
        <ul>
          {participantsData?.map(({ userId, participantName, vote }: Participant) => {
            const curentVote = vote ? (userId !== currentUserId ? (isVotesVisible ? vote : ' ? ') : vote) : ' no vote '
            return (
              <li key={Math.random()}>
                {participantName}
                {curentVote}
                {userId === currentUserId && <Button onClick={onLeaveSession(userId)}>Leave session</Button>}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

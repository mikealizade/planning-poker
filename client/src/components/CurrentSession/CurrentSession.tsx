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
import { getCurrentUserId } from '@/utils/storage'
import { VotesSummary } from '../VotesSummary/VotesSummary'
import { VotingButtons } from '../VotingButtons/VotingButtons'
import { useSession } from '@/hooks/useSession'

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const { data: { sessionData, participants: dbParticipants = [] } = {} } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  const {
    sessionData: { participants: wsParticipants, currentUserId = getCurrentUserId(), isVotesVisible },
  } = useAppContext()
  // const { clearVotes } = useWebSocket()
  const { updateSessionMutation } = useSession()

  const { deleteParticipantMutation, voteMutation } = useParticipant({ sessionId })
  const participantsData: Participant[] =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length ? mapParticpants(dbParticipants) : wsParticipants
  const userName = participantsData.find(({ userId }) => userId === currentUserId)?.participantName
  const areVotesVisible = isVotesVisible || sessionData?.is_votes_visible

  console.log('🚀 ~ CurrentSession ~ participantsData:', participantsData)
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
    updateSessionMutation.mutate({ id: sessionId, isVotesVisible: true })
  }

  const onClearVotes = () => {
    updateSessionMutation.mutate({ id: sessionId, isVotesVisible: false })
    createVote('')
    // clearVotes({ sessionId })
  }

  return (
    <main>
      <div> {userName}</div>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <Button onClick={onShowVotes}>Show votes</Button>
      <Button onClick={onClearVotes}>Clear votes</Button>
      {sessionData?.voting_type && <VotingButtons createVote={createVote} votingType={sessionData.voting_type} />}
      <div>
        Participants:
        <ul>
          {participantsData?.map(({ userId, participantName, vote }: Participant) => {
            const curentVote = vote ? (userId !== currentUserId ? (areVotesVisible ? vote : ' ? ') : vote) : ' no vote '

            return (
              <li key={Math.random()}>
                {participantName}
                {curentVote}
                {userId === currentUserId && <Button onClick={onLeaveSession(userId)}>Leave session</Button>}
              </li>
            )
          })}
          {areVotesVisible && <VotesSummary data={participantsData} />}
        </ul>
      </div>
      <p>
        Invite others:
        <br /> {`http://localhost:3000/join/${sessionId}`}
      </p>
    </main>
  )
}

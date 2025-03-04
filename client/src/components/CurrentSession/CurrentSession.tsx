'use client'
import { useQuery } from '@tanstack/react-query'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Styles.style'
import { useAppContext } from '@/providers/providers'
// import { useWebSocket } from '@/hooks/useWebSocket'
import { type Participant } from '@/hooks/useParticipant'
// import Link from 'next/link'
import { mapParticpants } from '@/utils/functions'
import { fetchSession } from '@/api/api'
import { getCurrentUserId } from '@/utils/storage'
import { VotesSummary } from '../VotesSummary/VotesSummary'
import { VotingButtons } from '../VotingButtons/VotingButtons'
import { useSession } from '@/hooks/useSession'
import * as S from './CurrentSession.style'
import Image from 'next/image'

type PlayerProps = {
  userId: string
  currentUserId: string
  name: string
  vote: string
  avatar: string
  onLeaveSession: (id: string) => () => void
  isOdd: boolean
}

type PlayersProps = {
  data: Participant[]
  currentUserId: string
  areVotesVisible: boolean
  onLeaveSession: (id: string) => () => void
  isOdd: boolean
}

const Player = ({ userId, currentUserId, name, vote, avatar, onLeaveSession, isOdd }: PlayerProps) => {
  return (
    <S.PlayerContainer isOdd={isOdd}>
      <Image alt='' src={`/images/avatars/${avatar}.png`} width={120} height={120} />
      <S.Player>
        <S.PlayerStatus>{vote}</S.PlayerStatus>
        <S.PlayerName>{name}</S.PlayerName>
        {userId === currentUserId && <S.LeaveButton onClick={onLeaveSession(userId)}>Leave</S.LeaveButton>}
      </S.Player>
    </S.PlayerContainer>
  )
}

const Players = ({ data, areVotesVisible, currentUserId, onLeaveSession, isOdd }: PlayersProps) => {
  const remainder = isOdd ? 0 : 1
  const filteredData = data.filter((_, index) => index % 2 !== remainder)
  return (
    <S.Players>
      {filteredData?.map(({ userId, participantName, vote, avatar = '' }: Participant) => {
        const currentVote = vote ? (userId !== currentUserId ? (areVotesVisible ? vote : ' ? ') : vote) : ' Not voted '

        return (
          <li key={Math.random()}>
            <Player
              userId={userId}
              currentUserId={String(currentUserId)}
              name={participantName}
              vote={currentVote}
              avatar={avatar}
              onLeaveSession={onLeaveSession}
              isOdd={isOdd}
            />
          </li>
        )
      })}
    </S.Players>
  )
}

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
    <S.Content>
      <S.LeftColumn>
        {/* <div>Session id: {sessionId}</div> */}
        <Players
          data={participantsData}
          currentUserId={String(currentUserId)}
          areVotesVisible={!!areVotesVisible}
          onLeaveSession={onLeaveSession}
          isOdd={false}
        />
      </S.LeftColumn>
      <S.MiddleColumn>
        <div> {userName}</div>
        <div>Session name: {sessionData?.session_name}</div>

        <Button onClick={onShowVotes}>Show votes</Button>
        <Button onClick={onClearVotes}>Clear votes</Button>
        {sessionData?.voting_type && <VotingButtons createVote={createVote} votingType={sessionData.voting_type} />}
        <div>
          Participants:
          <ul>
            {participantsData?.map(({ userId, participantName, vote }: Participant) => {
              const curentVote = vote ? (userId !== currentUserId ? (areVotesVisible ? vote : ' ? ') : vote) : ' Not voted '

              return (
                <li key={Math.random()}>
                  {participantName}
                  {curentVote}
                  {userId === currentUserId && <Button onClick={onLeaveSession(userId)}>Leave session</Button>}
                </li>
              )
            })}
          </ul>
          {areVotesVisible && <VotesSummary data={participantsData} />}
        </div>
        <p>
          Invite others:
          <br /> {`http://localhost:3000/join/${sessionId}`}
        </p>
      </S.MiddleColumn>
      <S.RightColumn>
        <Players
          data={participantsData}
          currentUserId={String(currentUserId)}
          areVotesVisible={!!areVotesVisible}
          onLeaveSession={onLeaveSession}
          isOdd
        />
      </S.RightColumn>
    </S.Content>
  )
}

'use client'
import { useQuery } from '@tanstack/react-query'
import { useParticipant } from '@/hooks/useParticipant'
import { SessionUrl } from '@/styles/Styles.style'
import { useAppContext } from '@/providers/providers'
import { type Participant } from '@/hooks/useParticipant'
import { mapParticpants } from '@/utils/functions'
import { fetchSession } from '@/api/api'
import { getCurrentUserId } from '@/utils/storage'
import { VotesSummary } from '../VotesSummary/VotesSummary'
import { VotingButtons } from '../VotingButtons/VotingButtons'
import { useSession } from '@/hooks/useSession'
import * as S from './CurrentSession.style'
import { Players } from '../Players/Players'
import { PiEye, PiBroom, PiCopySimple } from 'react-icons/pi'
import React from 'react'
import { Settings } from '@/components/Settings/Settings'
import { CenteredDiv } from '@/styles/Styles.style'

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const { data: { sessionData, participants: dbParticipants = [] } = {} } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  const {
    sessionData: { participants: wsParticipants, currentUserId = getCurrentUserId(), isVotesVisible },
  } = useAppContext()
  const { updateSessionMutation } = useSession()
  const { voteMutation } = useParticipant({ sessionId })
  const participantsData: Participant[] =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length ? mapParticpants(dbParticipants) : wsParticipants
  // const userName = participantsData.find(({ userId }) => userId === currentUserId)?.participantName
  const areVotesVisible = isVotesVisible || sessionData?.is_votes_visible

  console.log('🚀 ~ CurrentSession ~ participantsData:', participantsData)

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
  }

  const onCopySessionUrl = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/join/${sessionId}`)
      console.log('Copied to clipboard:')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      <Settings />
      <S.Content>
        <S.LeftColumn>
          <Players data={participantsData} isOdd={false} />
        </S.LeftColumn>
        <S.MiddleColumn>
          <VotesSummary data={participantsData} />
          {sessionData?.voting_type && (
            <VotingButtons
              data={participantsData}
              currentUserId={String(currentUserId)}
              areVotesVisible={!!areVotesVisible}
              createVote={createVote}
              votingType={sessionData.voting_type}
            />
          )}
          <CenteredDiv>
            <S.ShowButton onClick={onShowVotes}>
              <PiEye />
              Show votes
            </S.ShowButton>
            <S.ClearButton onClick={onClearVotes}>
              <PiBroom />
              Clear votes
            </S.ClearButton>
          </CenteredDiv>
        </S.MiddleColumn>
        <S.RightColumn>
          <Players data={participantsData} isOdd />
          <SessionUrl onClick={onCopySessionUrl}>
            Copy game link
            <PiCopySimple />
          </SessionUrl>
        </S.RightColumn>
      </S.Content>
    </>
  )
}

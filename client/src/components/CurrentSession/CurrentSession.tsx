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
import { useSession } from '@/hooks/useSession'
import * as S from './CurrentSession.style'
import { Players } from '../Players/Players'
import { PiEye, PiBroom, PiCopySimple } from 'react-icons/pi'
import React, { useEffect, useRef } from 'react'
import { Settings } from '@/components/Settings/Settings'
import { CenteredDiv } from '@/styles/Styles.style'
import { useSocket } from '@/providers/SocketProvider'
import { VotingButtons } from '../VotingButtons/VotingButtons'
import { DealtCards } from '../DealtCards/DealtCards'

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
  const areVotesVisible = isVotesVisible || sessionData?.is_votes_visible
  const { socket, isConnected } = useSocket()

  const hasRejoinedSession = useRef(false)

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
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    if (sessionId && isConnected && dbParticipants.length && !hasRejoinedSession.current) {
      if (dbParticipants.some(({ id }) => id === currentUserId)) {
        hasRejoinedSession.current = true
        socket!.emit('reconnectSession', { userId: currentUserId })
      }
    }
  }, [dbParticipants, socket, sessionId, currentUserId, isConnected])

  return (
    <>
      <Settings />
      <S.Content>
        <VotesSummary data={participantsData} areVotesVisible={!!areVotesVisible} />
        <Players data={participantsData} isOdd={false} />

        {sessionData?.voting_type && (
          <>
            <DealtCards data={participantsData} currentUserId={String(currentUserId)} areVotesVisible={!!areVotesVisible} />
            <VotingButtons createVote={createVote} votingType={sessionData.voting_type} />
          </>
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

        <SessionUrl onClick={onCopySessionUrl}>
          Copy game link
          <PiCopySimple />
        </SessionUrl>
      </S.Content>
    </>
  )
}

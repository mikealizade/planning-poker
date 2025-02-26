'use client'
import { useQuery } from '@tanstack/react-query'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'
import { useAppContext } from '@/providers/providers'
import { useWebSocket } from '@/hooks/useWebSocket'
import { type Participant } from '@/hooks/useParticipant'
import Link from 'next/link'
import { mapParticpants } from '@/utils/functions'
import { fetchSession, getCurrentUserId } from '@/api/api'
import { useState } from 'react'

const votingOptions: Record<string, string[]> = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
  'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', '12'],
  'create custom deck': [''],
}

const VotingButtons = ({ createVote, dbVotingType = '' }: { createVote: (vote: string) => void; dbVotingType?: string }) => {
  const [votingType, setVotingType] = useState(dbVotingType)
  console.log('🚀 ~ votingType:', votingType)

  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  const onSelectVotingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value
    if (target === 'custom') return
    setVotingType(target)
  }

  return (
    <>
      <select onChange={onSelectVotingType}>
        <option value=''>Select</option>
        {Object.keys(votingOptions).map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {votingType && (
        <ul>
          {votingOptions[votingType as keyof typeof votingOptions].map((vote: string) => (
            <li key={vote}>
              <button onClick={onVote(vote)}>{vote}</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const VotesSummary = ({ data }: { data: Participant[] }) => {
  const votes = Object.groupBy(data, ({ vote }) => vote)

  return (
    <ul>
      {Object.entries(votes).map(([key, value]) => (
        <li key={key}>
          {key} <strong>{value!.length}</strong>
        </li>
      ))}
    </ul>
  )
}

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const { data: { sessionData, participants: dbParticipants = [], votingType: dbVotingType } = {} } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  const {
    sessionData: { participants: wsParticipants, currentUserId = getCurrentUserId(), isVotesVisible },
  } = useAppContext()
  const { showVotes, clearVotes } = useWebSocket()
  const { deleteParticipantMutation, voteMutation } = useParticipant({ sessionId })
  const participantsData: Participant[] =
    dbParticipants?.length && sessionData?.id && !wsParticipants?.length ? mapParticpants(dbParticipants) : wsParticipants
  const userName = participantsData.find(({ userId }) => userId === currentUserId)?.participantName

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
      <VotingButtons createVote={createVote} dbVotingType={dbVotingType} />
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
          {isVotesVisible && <VotesSummary data={participantsData} />}
        </ul>
      </div>
      <p>
        Invite others:
        <br /> {`http://localhost:3000/join/${sessionId}`}
      </p>
    </>
  )
}

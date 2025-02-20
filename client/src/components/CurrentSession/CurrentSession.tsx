'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/hooks/useSession'
import { useParticipant } from '@/hooks/useParticipant'
import { Button } from '@/styles/Button.style'
import { useAppContext } from '@/providers/providers'
import type { Participant, ParticipantDB } from '@/hooks/useWebSocket'
import Link from 'next/link'

const mapParticpants = (participants: ParticipantDB[]): Participant[] => {
  return participants.map(participant => ({
    userId: participant.id,
    participantName: participant.participant_name,
  }))
}

export const CurrentSession = ({ sessionId }: { sessionId: string }) => {
  const { data: { sessionData, participants: dbParticipants = [] } = {} } = useQuery({
    queryKey: ['fetchSession', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  // console.log('🚀 ~ CurrentSession ~ dbParticipants:', dbParticipants)
  const {
    sessionData: { participants: wsParticipants, currentUserId },
  } = useAppContext()
  const { deleteParticipantMutation } = useParticipant({ sessionId })
  // const participants = !dbParticipants.length ? [] : wsParticipants
  // const participants = !wsParticipants.length && sessionData?.id ? mapParticpants(dbParticipants as ParticipantDB[]) : wsParticipants

  // const participants = !dbParticipants.length ? mapParticpants(dbParticipants as ParticipantDB[]) : wsParticipants
  // const participants = wsParticipants
  const participants =
    dbParticipants.length && sessionData?.id && !wsParticipants.length ? mapParticpants(dbParticipants as ParticipantDB[]) : wsParticipants

  const onLeaveSession = (id: string) => () => {
    console.log(`🚀 Leaving session: ${sessionId}, User: ${id}`)
    deleteParticipantMutation.mutate({ id })
  }
  // console.log('🚀 ~ CurrentSession ~ dbParticipants:', dbParticipants)
  // console.log('🚀 Participants:', participants)
  // console.log('🚀 ~ CurrentSession ~ sessionData from db:', sessionData)
  // console.log('🚀 ~ CurrentSession ~ sessionData?.id:', sessionData?.id)

  return (
    <>
      <div>Session name: {sessionData?.session_name}</div>
      <div>Session id: {sessionId}</div>
      <div>
        <Link href='/'>Home</Link>
      </div>
      <div>
        Participants:
        <ul>
          {participants?.map(({ userId, participantName }: Participant) => {
            console.log('🚀 ~ CurrentSession ~ userId:', userId)
            console.log('🚀 ~ CurrentSession ~ currentUserId:', currentUserId)
            return (
              <li key={userId}>
                {participantName} {userId === currentUserId && <Button onClick={onLeaveSession(userId)}>Leave session</Button>}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

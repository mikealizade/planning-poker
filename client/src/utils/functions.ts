import { Participant, ParticipantDB } from '@/hooks/useWebSocket'

export const mapParticpants = (participants: ParticipantDB[]): Participant[] => {
  return participants.map(participant => ({
    userId: participant.id,
    participantName: participant.participant_name,
    vote: participant.vote,
  }))
}

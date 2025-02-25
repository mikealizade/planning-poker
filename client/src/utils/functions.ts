import { ParticipantDB } from '@/hooks/useParticipant'

type MappedPArticipant = Pick<ParticipantDB, 'id' | 'participant_name' | 'vote'>

export const mapParticpants = (participants: ParticipantDB[]) => {
  return participants.map((participant: MappedPArticipant) => ({
    userId: participant.id,
    participantName: participant.participant_name,
    vote: participant.vote,
  }))
}

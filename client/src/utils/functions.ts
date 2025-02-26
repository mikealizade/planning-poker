import { Participant, ParticipantDB } from '@/hooks/useParticipant'

// type MappedPArticipant = Pick<ParticipantDB, 'id' | 'participant_name' | 'vote'>

export const mapParticpants = (participants: ParticipantDB[]): Participant[] => {
  console.log('🚀 ~ mapParticpants ~ participants:', participants)
  return participants.map(participant => ({
    userId: participant.id,
    participantName: participant.participant_name,
    vote: participant.vote,
  }))
}

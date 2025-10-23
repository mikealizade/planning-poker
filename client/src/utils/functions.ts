import { Participant, ParticipantDB } from '@/hooks/useParticipant'

type MappedParticipant = ParticipantDB & { avatar?: string }

export const mapParticpants = (participants: MappedParticipant[]): Participant[] => {
  return participants.map(participant => ({
    userId: participant.id,
    participantName: participant.participant_name,
    vote: participant.vote,
    avatar: participant.avatar,
  }))
}

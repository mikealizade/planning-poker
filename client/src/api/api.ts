import { apiUrl } from '@/components/CreateSession/CreateSession'
import { Participant, ParticipantDB } from '@/hooks/useParticipant'
import axios from 'axios'

type Vote = Pick<ParticipantDB, 'id' | 'session_id' | 'vote'>

export type Session = {
  id: string
  hostName: string
  session_name: string
  created_at: Date
  status: string
  voting_type: string
  is_votes_visible: boolean
}

type FetchSession = { sessionData: Session; participants: Participant[]; voting_type: string }

export const createSession = async ({ sessionName, votingType }: { sessionName: string; votingType?: string }): Promise<Session> => {
  const response = await axios.post(`${apiUrl}/createSession`, { sessionName, votingType })
  return response.data
}

export const updateSession = async ({ id, isVotesVisible }: { id: string; isVotesVisible: boolean }): Promise<Session> => {
  const response = await axios.patch(`${apiUrl}/updateSession`, { id, isVotesVisible })
  return response.data
}

export const deleteSession = async ({ id }: { id: string }): Promise<Session> => {
  const response = await axios.delete(`${apiUrl}/deleteSession/${id}`)
  return response.data
}

export const fetchSession = async ({ sessionId }: { sessionId: string }): Promise<FetchSession> => {
  const response = await axios.get(`${apiUrl}/fetchSession/${sessionId}`)
  return response.data
}

export const createParticipant = async (participant: ParticipantDB): Promise<ParticipantDB> => {
  const response = await axios.post(`${apiUrl}/createParticipant`, participant)
  return response.data
}

export const createVote = async (vote: Vote): Promise<ParticipantDB[]> => {
  const response = await axios.patch(`${apiUrl}/createVote`, vote)
  return response.data
}

export const fetchParticipants = async ({
  sessionId,
}: {
  sessionId: string
}): Promise<{ sessionData: Session; participants: ParticipantDB[] }> => {
  const response = await axios.get(`${apiUrl}/fetchSession/${sessionId}`)
  return response.data
}

export const deleteParticipant = async ({ id }: { id: string }): Promise<ParticipantDB> => {
  const response = await axios.delete(`${apiUrl}/deleteParticipant/${id}`)
  return response.data
}

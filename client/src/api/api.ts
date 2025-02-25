import { apiUrl } from '@/components/CreateSession/CreateSession'
import { Participant, ParticipantDB } from '@/hooks/useParticipant'
import axios from 'axios'
import { Session } from 'inspector'

type Vote = Pick<ParticipantDB, 'id' | 'session_id' | 'vote'>

export const createSession = async ({ sessionName }: { sessionName: string }): Promise<Session> => {
  const response = await axios.post(`${apiUrl}/createSession`, { sessionName })
  return response.data
}

export const deleteSession = async ({ id }: { id: string }): Promise<Session> => {
  const response = await axios.delete(`${apiUrl}/deleteSession/${id}`)
  return response.data
}

export const fetchSession = async ({
  sessionId,
}: {
  sessionId: string
}): Promise<{ sessionData: Session; participants: Participant[] }> => {
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

export const storeCurrentUserId = (currentUserId: string) => {
  window.sessionStorage.setItem('currentUserId', currentUserId)
}

export const deleteCurrentUserId = () => {
  window.sessionStorage.removeItem('currentUserId')
}

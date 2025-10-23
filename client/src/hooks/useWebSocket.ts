import { defaultSession, useAppContext } from '@/providers/providers'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { io } from 'socket.io-client'
import { Participant } from './useParticipant'

export type User = { sessionId: string; userId: string; participantName: string; avatar: string }

type VotesData = {
  isVotesVisible: boolean
}

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URI ?? process.env.NEXT_PUBLIC_LOCALHOST
const socket = io(socketUrl)

export const useWebSocket = () => {
  const router = useRouter()
  const { setSessionData } = useAppContext()

  socket.on('connect', () => {
    console.log('Connected to WebSocket:', socket.id)

    const userId = window.sessionStorage.getItem('currentUserId')
    if (userId) {
      socket.emit('reconnectSession', { userId })
    }
  })

  const joinSession = ({ sessionId, userId, participantName, avatar }: User) => {
    if (userId) {
      socket.emit('joinSession', { sessionId, userId, participantName, avatar })
      setSessionData(prevData => ({
        ...prevData,
        currentUserId: userId,
      }))
    }
  }

  const leaveSession = ({ sessionId, userId }: Omit<User, 'participantName' | 'avatar'>) => {
    if (userId) {
      socket.emit('leaveSession', { sessionId, userId })
    }
  }

  const makeVote = ({ sessionId, participants }: { sessionId: string; participants: Participant[] }) => {
    // if (userId) {
    socket.emit('createVote', { sessionId, participants })
    // }
  }

  const endSession = useCallback(() => {
    setSessionData(defaultSession)
    socket.disconnect()
    router.push('/')
  }, [router, setSessionData])

  const showVotes = ({ sessionId }: { sessionId: string }) => {
    socket.emit('showVotes', { sessionId })
  }

  const clearVotes = ({ sessionId }: { sessionId: string }) => {
    socket.emit('clearVotes', { sessionId })
  }

  useEffect(() => {
    const handleSessionUpdate = (updatedParticipants: Participant[]) => {
      console.log('🚀 Session updated:', updatedParticipants)

      setSessionData(prevData => ({
        ...prevData,
        participants: updatedParticipants.sort((a, b) => {
          const aHasVote = a.vote !== ''
          const bHasVote = b.vote !== ''
          return +bHasVote - +aHasVote
        }),
      }))

      if (!updatedParticipants.length) {
        endSession()
      }
    }

    const handleVotes = ({ isVotesVisible }: VotesData) => {
      setSessionData(prevData => ({
        ...prevData,
        isVotesVisible,
      }))
    }

    socket.on('sessionUpdated', handleSessionUpdate)
    socket.on('showVotes', handleVotes)
    socket.on('clearVotes', handleVotes)

    return () => {
      socket.off('sessionUpdated', handleSessionUpdate)
    }
  }, [setSessionData, endSession])

  return { joinSession, leaveSession, makeVote, showVotes, clearVotes }
}

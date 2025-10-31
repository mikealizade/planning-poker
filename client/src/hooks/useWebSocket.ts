import { useSocket } from '@/providers/SocketProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { Participant } from './useParticipant'
import { useAppContext, defaultSession } from '@/providers/providers'

export type User = {
  sessionId: string
  userId: string
  participantName: string
  avatar: string
}

type VotesData = { isVotesVisible: boolean }
type MakeVote = { sessionId: string; participants: Participant[] }
type SessionId = { sessionId: string }
type LeaveSession = Omit<User, 'participantName' | 'avatar'>

export const useWebSocket = () => {
  const { socket, isConnected } = useSocket()
  const { setSessionData } = useAppContext()
  const router = useRouter()

  const endSession = useCallback(() => {
    setSessionData(defaultSession)
    socket?.disconnect()
    router.push('/')
  }, [router, setSessionData, socket])

  useEffect(() => {
    if (!socket) return

    const handleSessionUpdate = (updatedParticipants: Participant[]) => {
      console.log('🚀 Session updated:', updatedParticipants)

      setSessionData(prev => ({
        ...prev,
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
      setSessionData(prev => ({
        ...prev,
        isVotesVisible,
      }))
    }

    socket.on('sessionUpdated', handleSessionUpdate)
    socket.on('showVotes', handleVotes)
    socket.on('clearVotes', handleVotes)

    return () => {
      socket.off('sessionUpdated', handleSessionUpdate)
      socket.off('showVotes', handleVotes)
      socket.off('clearVotes', handleVotes)
    }
  }, [socket, setSessionData, endSession])

  const joinSession = (user: User) => {
    if (socket && isConnected) {
      socket.emit('joinSession', user)
    }
  }

  const leaveSession = ({ sessionId, userId }: LeaveSession) => {
    socket?.emit('leaveSession', { sessionId, userId })
  }

  const makeVote = ({ sessionId, participants }: MakeVote) => {
    socket?.emit('createVote', { sessionId, participants })
  }

  const showVotes = ({ sessionId }: SessionId) => {
    socket?.emit('showVotes', { sessionId })
  }

  const clearVotes = ({ sessionId }: SessionId) => {
    socket?.emit('clearVotes', { sessionId })
  }

  return { joinSession, leaveSession, makeVote, showVotes, clearVotes }
}

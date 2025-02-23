import { defaultSession, useAppContext } from '@/providers/providers'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { io } from 'socket.io-client'

type User = { sessionId: string; userId: string; participantName: string }
export type Participant = Pick<User, 'userId' | 'participantName'> & { vote: string }
export type ParticipantDB = {
  id: string
  participant_name: string
  vote: string
}
type VotesData = {
  isVotesVisible: boolean
  isVotesCleared: boolean
}

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URI ?? process.env.NEXT_PUBLIC_LOCALHOST
const socket = io(socketUrl)

export const useWebSocket = () => {
  const router = useRouter()
  const { setSessionData } = useAppContext()

  const joinSession = ({ sessionId, userId, participantName }: User) => {
    if (userId) {
      console.log('🚀 Emitting joinSession:', { sessionId, userId, participantName })
      socket.emit('joinSession', { sessionId, userId, participantName })
      setSessionData(prevData => ({
        ...prevData,
        currentUserId: userId,
      }))
    }
  }

  const leaveSession = ({ sessionId, userId, participantName }: User) => {
    if (userId) {
      console.log('🚀 Emitting leaveSession:', { sessionId, userId, participantName })
      socket.emit('leaveSession', { sessionId, userId, participantName })
    }
  }

  const makeVote = ({ sessionId, participants }: { sessionId: string; participants: ParticipantDB[] }) => {
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
        participants: updatedParticipants,
      }))

      if (!updatedParticipants.length) {
        endSession()
      }
    }

    const handleShowVotes = ({ isVotesVisible, isVotesCleared }: VotesData) => {
      console.log('🚀 ~ handleShowVotes ~ { isVotesVisible, isVotesCleared }:', { isVotesVisible, isVotesCleared })
      setSessionData(prevData => ({
        ...prevData,
        isVotesVisible,
        isVotesCleared,
      }))
    }

    // const handleClearVotes = (isVotesCleared: boolean) => {
    //   setSessionData(prevData => ({
    //     ...prevData,
    //     isVotesCleared,
    //   }))
    // }

    socket.on('sessionUpdated', handleSessionUpdate)
    socket.on('showVotes', handleShowVotes)
    socket.on('clearVotes', handleShowVotes)

    return () => {
      socket.off('sessionUpdated', handleSessionUpdate)
    }
  }, [setSessionData, endSession])

  return { joinSession, leaveSession, makeVote, showVotes, clearVotes }
}

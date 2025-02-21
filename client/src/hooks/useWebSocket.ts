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
    console.log('🚀 Creating vote:', { sessionId, participants })
    socket.emit('createVote', { sessionId, participants })
    // }
  }

  const endSession = useCallback(() => {
    setSessionData(defaultSession)
    socket.disconnect()
    router.push('/')
  }, [router, setSessionData])

  // const deleteSession = ({ sessionId, userId, participantName }: User) => {
  //   console.log('🚀 Emitting leaveSession:', { sessionId, userId, participantName })
  //   // const participants = prevData => ({
  //   //   ...prevData,
  //   //   participants: [...prevData.participants.filter(particpant => particpant.userId !== userId)],
  //   // })
  //   socket.emit('leaveSession', { sessionId, userId, participantName })
  //   // socket.on('sessionUpdated', handleSessionUpdate(userId, participantName, false))
  // }

  useEffect(() => {
    const handleSessionUpdate = (updatedParticipants: Participant[]) => {
      console.log('🚀 Session updated:', updatedParticipants)

      setSessionData(prevData => ({
        ...prevData,
        participants: updatedParticipants,
      }))

      // if (!updatedParticipants.length) {
      //   endSession()
      // }
    }

    socket.on('sessionUpdated', handleSessionUpdate)

    return () => {
      socket.off('sessionUpdated', handleSessionUpdate)
    }
  }, [setSessionData, endSession])

  return { joinSession, leaveSession, makeVote }
}

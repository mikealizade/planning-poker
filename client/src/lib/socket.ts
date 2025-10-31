import { io, Socket } from 'socket.io-client'

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URI ?? process.env.NEXT_PUBLIC_LOCALHOST

let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(socketUrl, { autoConnect: false })
  }
  return socket
}

import { io } from 'socket.io-client'
import { getApiBaseUrl } from './baseUrl'

export function createLiveSocket(token) {
  return io(getApiBaseUrl(), {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    auth: {
      token,
    },
  })
}

export default createLiveSocket

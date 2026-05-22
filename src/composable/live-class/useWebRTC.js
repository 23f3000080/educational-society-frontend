import { computed, onBeforeUnmount, ref } from 'vue'
import Peer from 'simple-peer'
import { createLiveSocket } from '../../services/socket'

function createRemoteStreamMap() {
  return new Map()
}

function participantLabel(participant) {
  return participant?.name || 'Participant'
}

export function useWebRTC({ liveClassId, token, currentUser }) {
  const socket = ref(null)
  const localStream = ref(null)
  const previewStream = ref(null)
  const roomInfo = ref(null)
  const roomParticipantCount = ref(0)
  const participants = ref([])
  const remoteStreams = ref([])
  const chatMessages = ref([])
  const isConnected = ref(false)
  const isConnecting = ref(false)
  const isScreenSharing = ref(false)
  const micEnabled = ref(true)
  const cameraEnabled = ref(true)
  const handRaised = ref(false)
  const speaking = ref(false)
  const error = ref('')
  const localSocketId = ref('')
  const hasJoinedRoom = ref(false)
  const peerMap = new Map()
  const pendingSignals = new Map()
  const speakingTimer = ref(null)
  const speechAudioContext = ref(null)
  const activeDisplayStream = ref(null)
  const localUser = computed(() => ({
    id: currentUser?.id || null,
    name: currentUser?.name || 'You',
    role: currentUser?.role || 'student',
  }))

  const setError = (message) => {
    error.value = message || ''
  }

  const stopSpeakingMonitor = () => {
    if (speakingTimer.value) {
      clearInterval(speakingTimer.value)
      speakingTimer.value = null
    }

    if (speechAudioContext.value) {
      speechAudioContext.value.close().catch(() => {})
      speechAudioContext.value = null
    }
  }

  const publishLocalState = () => {
    if (!socket.value?.connected) return

    socket.value.emit('participant-state', {
      mic_on: micEnabled.value,
      camera_on: cameraEnabled.value,
      screen_sharing: isScreenSharing.value,
      hand_raised: handRaised.value,
      speaking: speaking.value,
    })
  }

  const syncParticipants = (list) => {
    participants.value = Array.isArray(list) ? list : []
    roomParticipantCount.value = participants.value.length + 1
  }

  const upsertParticipant = (participant) => {
    if (!participant?.socket_id) return
    const next = [...participants.value]
    const index = next.findIndex((item) => item.socket_id === participant.socket_id)
    if (index >= 0) {
      next[index] = { ...next[index], ...participant }
    } else {
      next.push(participant)
    }
    participants.value = next
    roomParticipantCount.value = next.length + 1
  }

  const removeParticipant = (socketId) => {
    participants.value = participants.value.filter((participant) => participant.socket_id !== socketId)
    remoteStreams.value = remoteStreams.value.filter((item) => item.socket_id !== socketId)
    roomParticipantCount.value = participants.value.length + 1
  }

  const replaceLocalPreview = (videoTrack) => {
    if (!localStream.value) return
    const audioTracks = localStream.value.getAudioTracks()
    const trackList = [...audioTracks]
    if (videoTrack) {
      trackList.push(videoTrack)
    }
    previewStream.value = new MediaStream(trackList)
  }

  const getOutboundStream = () => {
    const videoTrack = isScreenSharing.value
      ? activeDisplayStream.value?.getVideoTracks?.()[0] || localStream.value?.getVideoTracks?.()[0]
      : localStream.value?.getVideoTracks?.()[0]

    if (!localStream.value || !videoTrack) {
      return localStream.value
    }

    const audioTracks = localStream.value.getAudioTracks()
    return new MediaStream([...audioTracks, videoTrack])
  }

  const replacePeerVideoTrack = (videoTrack) => {
    peerMap.forEach((peer) => {
      if (!peer?._pc?.getSenders) return
      const sender = peer._pc.getSenders().find((item) => item.track && item.track.kind === 'video')
      if (sender && typeof sender.replaceTrack === 'function') {
        sender.replaceTrack(videoTrack)
      }
    })
  }

  const registerRemoteStream = (socketId, stream) => {
    const next = remoteStreams.value.filter((item) => item.socket_id !== socketId)
    const participant = participants.value.find((item) => item.socket_id === socketId)
    next.push({
      socket_id: socketId,
      participant,
      stream,
      speaking: participant?.speaking || false,
      hand_raised: participant?.hand_raised || false,
      screen_sharing: participant?.screen_sharing || false,
    })
    remoteStreams.value = next
  }

  const removePeer = (socketId) => {
    const peer = peerMap.get(socketId)
    if (peer) {
      peer.destroy()
      peerMap.delete(socketId)
    }
    remoteStreams.value = remoteStreams.value.filter((item) => item.socket_id !== socketId)
  }

  const createPeer = (socketId, initiator) => {
    if (!localStream.value || peerMap.has(socketId)) return

    const peer = new Peer({
      initiator,
      trickle: false,
      stream: getOutboundStream(),
    })

    peer.on('signal', (signal) => {
      if (!socket.value?.connected) return
      socket.value.emit('signal', {
        target_socket_id: socketId,
        signal,
      })
    })

    peer.on('stream', (stream) => {
      registerRemoteStream(socketId, stream)
    })

    peer.on('close', () => {
      removePeer(socketId)
    })

    peer.on('error', (peerError) => {
      setError(peerError?.message || 'Peer connection failed')
    })

    peerMap.set(socketId, peer)

    const queuedSignals = pendingSignals.get(socketId)
    if (Array.isArray(queuedSignals) && queuedSignals.length > 0) {
      queuedSignals.forEach((signal) => {
        try {
          peer.signal(signal)
        } catch (_error) {
          // If a queued signal is stale we keep the peer alive and continue.
        }
      })
      pendingSignals.delete(socketId)
    }
  }

  const ensureLocalMedia = async () => {
    if (localStream.value) return localStream.value

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user',
      },
    })

    localStream.value = stream
    previewStream.value = stream

    const videoTrack = stream.getVideoTracks()[0]
    const audioTrack = stream.getAudioTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = cameraEnabled.value
    }
    if (audioTrack) {
      audioTrack.enabled = micEnabled.value
    }

    startSpeakingMonitor()
    return stream
  }

  const startSpeakingMonitor = () => {
    stopSpeakingMonitor()
    if (!localStream.value?.getAudioTracks().length) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    speechAudioContext.value = audioContext
    const source = audioContext.createMediaStreamSource(localStream.value)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 512
    source.connect(analyser)

    const data = new Uint8Array(analyser.frequencyBinCount)
    let lastSpeaking = false

    speakingTimer.value = window.setInterval(() => {
      analyser.getByteFrequencyData(data)
      const average = data.reduce((sum, value) => sum + value, 0) / data.length
      const nextSpeaking = average > 20 && micEnabled.value
      if (nextSpeaking !== lastSpeaking) {
        lastSpeaking = nextSpeaking
        speaking.value = nextSpeaking
        publishLocalState()
      }
    }, 250)

    const cleanup = () => {
      stopSpeakingMonitor()
    }

    if (localStream.value) {
      const track = localStream.value.getAudioTracks()[0]
      if (track) {
        track.addEventListener('ended', cleanup, { once: true })
      }
    }
  }

  const registerSocketEvents = () => {
    if (!socket.value) return

    socket.value.on('connect', () => {
      isConnected.value = true
      localSocketId.value = socket.value.id || ''
      if (hasJoinedRoom.value) {
        socket.value.emit('join-room', { live_class_id: liveClassId.value })
      }
    })

    socket.value.on('disconnect', () => {
      isConnected.value = false
    })

    socket.value.on('connect_error', (socketError) => {
      setError(socketError?.message || 'Socket connection error')
    })

    socket.value.on('socket:connected', (payload) => {
      localSocketId.value = payload?.socket_id || socket.value?.id || ''
    })

    socket.value.on('signal', (payload) => {
      const fromSocketId = payload?.from_socket_id
      const signal = payload?.signal
      const peer = peerMap.get(fromSocketId)

      if (!signal || !fromSocketId) return

      if (peer) {
        peer.signal(signal)
        return
      }

      const queuedSignals = pendingSignals.get(fromSocketId) || []
      queuedSignals.push(signal)
      pendingSignals.set(fromSocketId, queuedSignals)
    })

    socket.value.on('room:participant-joined', (payload) => {
      const participant = payload?.participant
      if (!participant || participant.socket_id === localSocketId.value) return
      upsertParticipant(participant)
      createPeer(participant.socket_id, false)
    })

    socket.value.on('room:participant-left', (payload) => {
      const socketId = payload?.socket_id
      if (!socketId) return
      pendingSignals.delete(socketId)
      removeParticipant(socketId)
      removePeer(socketId)
    })

    socket.value.on('room:participants', (payload) => {
      const list = Array.isArray(payload?.participants) ? payload.participants : []
      syncParticipants(list.filter((participant) => participant.socket_id !== localSocketId.value))
    })

    socket.value.on('room:participant-count', (payload) => {
      roomParticipantCount.value = Number(payload?.count || 1)
    })

    socket.value.on('participant-updated', (payload) => {
      const participant = payload?.participant
      if (!participant?.socket_id) return
      upsertParticipant(participant)
      const remote = remoteStreams.value.find((item) => item.socket_id === participant.socket_id)
      if (remote) {
        remote.speaking = participant.speaking
        remote.hand_raised = participant.hand_raised
        remote.screen_sharing = participant.screen_sharing
      }
    })

    socket.value.on('chat-message', (message) => {
      chatMessages.value = [...chatMessages.value, message].slice(-100)
    })

    socket.value.on('signal', (payload) => {
      const fromSocketId = payload?.from_socket_id
      const signal = payload?.signal
      const peer = peerMap.get(fromSocketId)
      if (peer && signal) {
        peer.signal(signal)
      }
    })

    socket.value.on('room:pong', () => {})
  }

  const connect = async () => {
    if (!token) {
      setError('Missing authentication token')
      return
    }

    if (!socket.value) {
      socket.value = createLiveSocket(token)
      registerSocketEvents()
    }

    if (!socket.value.connected) {
      socket.value.auth = { token }
      socket.value.connect()
    }
  }

  const joinRoom = async () => {
    isConnecting.value = true
    setError('')

    try {
      await ensureLocalMedia()
      await connect()
      hasJoinedRoom.value = true

      if (socket.value?.connected) {
        socket.value.emit('join-room', { live_class_id: liveClassId.value })
      }
    } catch (joinError) {
      setError(joinError?.message || 'Could not access camera and microphone')
    } finally {
      isConnecting.value = false
    }
  }

  const emitParticipantState = () => {
    publishLocalState()
  }

  const toggleMic = () => {
    micEnabled.value = !micEnabled.value
    const audioTrack = localStream.value?.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = micEnabled.value
    }
    speaking.value = micEnabled.value && speaking.value
    emitParticipantState()
  }

  const toggleCamera = () => {
    cameraEnabled.value = !cameraEnabled.value
    const videoTrack = localStream.value?.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = cameraEnabled.value
    }
    emitParticipantState()
  }

  const stopScreenShare = () => {
    if (!isScreenSharing.value) return

    const cameraVideoTrack = localStream.value?.getVideoTracks()[0]
    const displayTracks = activeDisplayStream.value?.getTracks?.() || []
    displayTracks.forEach((track) => track.stop())
    activeDisplayStream.value = null
    isScreenSharing.value = false

    if (cameraVideoTrack) {
      replacePeerVideoTrack(cameraVideoTrack)
      replaceLocalPreview(cameraVideoTrack)
    }

    emitParticipantState()
  }

  const toggleScreenShare = async () => {
    if (isScreenSharing.value) {
      stopScreenShare()
      return
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
      activeDisplayStream.value = displayStream
      const displayTrack = displayStream.getVideoTracks()[0]
      if (!displayTrack) return

      displayTrack.addEventListener('ended', () => {
        stopScreenShare()
      }, { once: true })

      replacePeerVideoTrack(displayTrack)
      replaceLocalPreview(displayTrack)
      isScreenSharing.value = true
      emitParticipantState()
    } catch (screenError) {
      setError(screenError?.message || 'Screen sharing was blocked')
    }
  }

  const toggleHandRaise = () => {
    handRaised.value = !handRaised.value
    emitParticipantState()
  }

  const sendChatMessage = (message) => {
    const text = String(message || '').trim()
    if (!text || !socket.value?.connected) return

    socket.value.emit('chat-message', { message: text })
  }

  const markSpeaking = (value) => {
    speaking.value = Boolean(value)
    emitParticipantState()
  }

  const refreshRoom = () => {
    if (socket.value?.connected && hasJoinedRoom.value) {
      socket.value.emit('join-room', { live_class_id: liveClassId.value })
    }
  }

  const leaveRoom = () => {
    hasJoinedRoom.value = false
    if (socket.value?.connected) {
      socket.value.emit('leave-room')
    }
    cleanup()
  }

  const cleanup = () => {
    stopSpeakingMonitor()
    peerMap.forEach((peer) => peer.destroy())
    peerMap.clear()
    remoteStreams.value = []
    participants.value = []
    chatMessages.value = []

    if (activeDisplayStream.value) {
      activeDisplayStream.value.getTracks().forEach((track) => track.stop())
      activeDisplayStream.value = null
    }

    if (localStream.value) {
      localStream.value.getTracks().forEach((track) => track.stop())
      localStream.value = null
    }

    if (socket.value) {
      socket.value.off()
      socket.value.disconnect()
      socket.value = null
    }

    previewStream.value = null
    isConnected.value = false
    roomInfo.value = null
    roomParticipantCount.value = 0
    localSocketId.value = ''
  }

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    socket,
    localStream,
    previewStream,
    roomInfo,
    roomParticipantCount,
    participants,
    remoteStreams,
    chatMessages,
    isConnected,
    isConnecting,
    isScreenSharing,
    micEnabled,
    cameraEnabled,
    handRaised,
    speaking,
    error,
    localSocketId,
    localUser,
    participantLabel,
    joinRoom,
    leaveRoom,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    toggleHandRaise,
    sendChatMessage,
    refreshRoom,
    markSpeaking,
    cleanup,
  }
}

export default useWebRTC

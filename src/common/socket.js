import Redis from 'socket.io-redis'

import client from './redis'

const redisAdapter = Redis({
  pubClient: client,
  subClient: client,
})

export default function socketHandler(io) {
  // Initializes the Redis Adapter for Socket.io
  io.adapter(redisAdapter)

  io.on('connection', socket => {
    // socket.emit('message', 'PING')
    // socket.on('message', data => {})
  })

  io.use((socket, next) => {
    socket.feathers.referrer = socket.request.referrer
    next()
  })
}

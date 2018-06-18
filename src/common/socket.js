export default function socketHandler(io) {
  io.on('connection', socket => {
    // socket.emit('message', 'PING')
    // socket.on('message', data => {})
  })

  io.use((socket, next) => {
    socket.feathers.referrer = socket.request.referrer
    next()
  })
}

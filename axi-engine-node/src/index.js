const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const memory = require('feathers-memory')

// Creates an Express compatible Feathers application
const app = express(feathers())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.configure(express.rest())
app.configure(socketio())

app.use(
  '/messages',
  memory({
    paginate: {
      default: 10,
      max: 25,
    },
  }),
)

app.use(express.errorHandler())

app.on('connection', connection => app.channel('everybody').join(connection))

app.publish(data => app.channel('everybody'))

// Start the server
app.listen(3030).on('listening', () => {
  console.log('Feathers server listening on localhost:3030')
})

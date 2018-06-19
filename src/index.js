import cors from 'cors'
import helmet from 'helmet'

import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import log from 'feathers-logger'
import sync from 'feathers-sync'

import hooks from './hooks'
import services from './services'
import channels from './common/channels'
import middleware from './common/middleware'

import logger from './common/logger'
import socket from './common/socket'

import {PORT, REDIS_URL} from './common/config'

import {runSubscriptionServer} from './graphql/subscription'

const app = express(feathers())

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.configure(express.rest())
app.configure(socket)

app.configure(log(logger))
app.configure(sync({uri: REDIS_URL}))

app.configure(services)
app.configure(channels)
app.configure(middleware)

app.use(express.notFound())
app.use(express.errorHandler({logger}))

app.hooks(hooks)

const server = app.listen(PORT)

server.on('listening', () => {
  console.log('[💖]', `The Axi Engine is now listening on Port ${PORT}!`)

  runSubscriptionServer(server)
})

process.on('unhandledRejection', (reason, promise) => {
  console.warn('[!!] Unhandled Rejection:', reason, 'at:', promise)
})

function shutdown(code) {
  console.log('[!] Shutting Down:', code)

  process.exit()
}

const shutdownEvents = ['SIGINT', 'SIGQUIT', 'SIGTERM', 'SIGHUP', 'SIGSTP']

shutdownEvents.forEach(event => process.on(event, shutdown))

export default app

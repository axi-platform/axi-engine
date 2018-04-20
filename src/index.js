import path from 'path'
import favicon from 'serve-favicon'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'winston'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

import middleware from './middleware'
import services from './services'
import hooks from './hooks'
import channels from './channels'

const app = express(feathers())

app.configure(configuration())

app.use(cors())
app.use(helmet())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))

app.use('/', express.static(app.get('public')))

app.configure(express.rest())
app.configure(socketio())

app.configure(middleware)
app.configure(services)
app.configure(channels)

app.use(express.notFound())
app.use(express.errorHandler({logger}))

app.hooks(hooks)

const PORT = app.get('port')

app.listen(PORT).on('listening', () => {
  console.log('💖', `The Axi Engine is now listening on Port ${PORT}!`)
})

export default app

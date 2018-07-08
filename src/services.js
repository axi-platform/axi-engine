import users from './users'
import auth from './auth'
import graphql from './graphql'
import services from './axi-services'
import queue from './queue'
import upload from './upload'
import documents from './documents'
import devices from './devices'
import projects from './projects'
import debug from './debug'
import rabbitAuth from './rabbit-auth'

export default async function(app) {
  // Register the services
  app.configure(users)
  app.configure(auth)
  app.configure(services)
  app.configure(queue)
  app.configure(upload)
  app.configure(documents)
  app.configure(devices)
  app.configure(projects)
  app.configure(rabbitAuth)
  app.configure(debug)
  app.configure(graphql)
}

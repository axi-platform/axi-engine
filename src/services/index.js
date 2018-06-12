import auth from './auth'
import graphql from './graphql'
import queue from './queue'
import seating from './seating'
import users from './users'

import models from '../models'

export default async function(app) {
  // Register the services
  app.configure(auth)
  app.configure(users)
  app.configure(seating)
  app.configure(queue)
  app.configure(graphql)

  // Synchronize all models afterward
  // TODO: Do not force in production!
  await models.sync({force: true})
}

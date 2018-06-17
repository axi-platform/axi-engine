import auth from './auth'
import graphql from './graphql'
import queue from './queue'
import upload from './upload'
import devices from './devices'
import projects from './projects'
import rabbitAuth from './rabbit-auth'
import seating from './seating'
import users from './users'

import sequelize from './common/sequelize'

export default async function(app) {
  // Register the services
  app.configure(auth)
  app.configure(users)
  app.configure(seating)
  app.configure(queue)
  app.configure(upload)
  app.configure(devices)
  app.configure(projects)
  app.configure(rabbitAuth)
  app.configure(graphql)

  // Synchronize all models afterward
  // TODO: Do not force in production!
  await sequelize.sync({force: false})
}

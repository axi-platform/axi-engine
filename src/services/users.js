import SequelizeService from 'feathers-sequelize'
import auth from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import User from '../models/user'

export default function users() {
  this.use('users', new SequelizeService({Model: User}))

  this.service('users').hooks({
    before: {
      find: [auth.hooks.authenticate('jwt')],
      create: [local.hooks.hashPassword({passwordField: 'password'})],
    },
    after: {
      create: [local.hooks.protect('password')],
    },
  })
}

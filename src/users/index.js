import SequelizeService from 'feathers-sequelize'
import auth from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import User from './model'

import validate from '../hooks/validate'

async function defaultRole(ctx) {
  ctx.data.permissions = 'admin:*'
}

const validateInput = validate({
  username: 'string',
  password: 'string',
})

export default function users() {
  this.use('users', new SequelizeService({Model: User}))

  this.service('users').hooks({
    before: {
      find: [auth.hooks.authenticate('jwt')],
      create: [
        validateInput,
        defaultRole,
        local.hooks.hashPassword({passwordField: 'password'}),
      ],
    },
    after: {
      create: [local.hooks.protect('password')],
    },
  })
}

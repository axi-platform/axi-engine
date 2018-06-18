import auth from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import validate from '../hooks/validate'

async function defaultRole(ctx) {
  ctx.data.permissions = 'admin:*'
}

const validateInput = validate({
  username: 'string',
  password: 'string',
})

export default {
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
}

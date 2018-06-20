import local from '@feathersjs/authentication-local'
import errors from '@feathersjs/errors'

export default {
  before: {
    create: [local.hooks.hashPassword({passwordField: 'password'})],
  },
  after: {
    all: [local.hooks.protect('password')],
  },
}

import local from '@feathersjs/authentication-local'

export default {
  before: {
    create: [local.hooks.hashPassword({passwordField: 'password'})],
  },
  after: {
    // all: [local.hooks.protect('password')],
  },
}

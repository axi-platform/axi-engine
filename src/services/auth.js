import auth from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import {secret} from 'config'

const authOptions = {
  secret,
  path: '/authentication',
  header: 'Authorization',
  entity: 'user',
  service: 'users',
  passReqToCallback: true,
  session: true,
  cookie: {
    enabled: true,
    name: 'feathers-jwt',
    httpOnly: true,
    secure: true,
  },
  jwt: {
    header: {typ: 'access'},
    audience: 'https://yourdomain.com',
    subject: 'anonymous',
    issuer: 'feathers',
    algorithm: 'HS256',
    expiresIn: '1d',
  },
}

const localOptions = {
  name: 'local',
  entity: 'user',
  service: 'users',
  usernameField: 'email',
  passwordField: 'password',
  entityUsernameField: 'email',
  entityPasswordField: 'password',
  passReqToCallback: true,
  session: true,
}

export default function() {
  this.configure(auth(authOptions))
  this.configure(local(localOptions))

  this.service('authentication').hooks({
    before: {
      create: [auth.hooks.authenticate(['jwt', 'local'])],
      remove: [auth.hooks.authenticate('jwt')],
    },
  })
}

import auth from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'
import jwt from '@feathersjs/authentication-jwt'
import authManagement from 'feathers-authentication-management'

import {secret} from 'config'

const authOptions = {
  secret,
  path: '/authentication',
  header: 'Authorization',
  entity: 'user',
  service: 'users',
  session: false,
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
  session: false,
}

const jwtOptions = {
  session: false,
}

const managementOptions = {}

export default function() {
  this.configure(auth(authOptions))
  this.configure(jwt(jwtOptions))
  this.configure(local(localOptions))
  this.configure(authManagement(managementOptions))

  this.service('authentication').hooks({
    before: {
      create: [auth.hooks.authenticate(['jwt', 'local'])],
      remove: [auth.hooks.authenticate('jwt')],
    },
  })
}

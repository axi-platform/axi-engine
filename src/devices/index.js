import SequelizeService from 'feathers-sequelize'
import local from '@feathersjs/authentication-local'

import Model from './model'
import Processor from './processor'

export default async function devices() {
  const devices = new SequelizeService({
    Model,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('devices', devices)

  this.service('devices').hooks({
    before: {
      create: [local.hooks.hashPassword({passwordField: 'password'})],
    },
    after: {
      all: [local.hooks.protect('password')],
    },
  })

  Processor(this)
}

import SequelizeService from 'feathers-sequelize'
import local from '@feathersjs/authentication-local'

import Device from '../models/device'

export default async function devices() {
  this.use('devices', new SequelizeService({Model: Device}))

  this.service('devices').hooks({
    before: {
      create: [local.hooks.hashPassword({passwordField: 'password'})],
    },
    after: {
      create: [local.hooks.protect('password')],
    },
  })
}

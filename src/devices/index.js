import {Service} from 'feathers-sequelize'
import local from '@feathersjs/authentication-local'

import Device from './model'
import nearest from './nearest'
import Processor from './processor'

class DeviceService extends Service {}

export default async function devices() {
  const devices = new DeviceService({
    Model: Device,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('devices/nearest', nearest)
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

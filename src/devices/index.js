import {Service} from 'feathers-objection'
import local from '@feathersjs/authentication-local'

import Device from './model'
import nearest from './nearest'
import Processor from './processor'

export default async function() {
  const devices = new Service({
    model: Device,
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

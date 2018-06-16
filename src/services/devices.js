import SequelizeService from 'feathers-sequelize'
import local from '@feathersjs/authentication-local'

import {send, consume} from '../core/queue'

import Device from '../models/device'

function DeviceController(app) {
  const devices = app.service('devices')

  async function onStatusUpdate(data, key, meta) {
    console.log('[> Device Status Update]', data)
  }

  consume('amq.topic', 'device.*.status', onStatusUpdate)
}

export default async function devices() {
  const devices = new SequelizeService({
    Model: Device,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('devices', devices)

  DeviceController(this)

  this.service('devices').hooks({
    before: {
      create: [local.hooks.hashPassword({passwordField: 'password'})],
    },
    after: {
      all: [local.hooks.protect('password')],
    },
  })
}

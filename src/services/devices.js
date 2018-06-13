import errors from '@feathersjs/errors'
import local from '@feathersjs/authentication-local'

import Device from '../models/device'

class DeviceService {
  async setup(app) {
    this.app = app
  }

  async find() {
    const devices = await Device.findAll()

    return {data: devices}
  }

  async create(data) {
    const device = await Device.create(data)

    return {data: device}
  }
}

export default async function devices() {
  this.use('devices', new DeviceService())

  this.service('devices').hooks({
    before: {
      create: [local.hooks.hashPassword({passwordField: 'password'})],
    },
    after: {
      create: [local.hooks.protect('password')],
    },
  })
}

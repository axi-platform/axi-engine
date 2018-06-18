import {Service} from 'feathers-objection'
import local from '@feathersjs/authentication-local'
import errors from 'feathers-errors'

import Device from './model'
import nearby from './nearby'
import Processor from './processor'

import knex, {sql, postgis} from '../common/knex'

class DeviceService extends Service {}

async function convertGeometry(ctx) {
  const {data} = ctx

  if (data.position) {
    if (!Array.isArray(data.position)) {
      throw new errors.BadRequest('Position must be a [lat, lon] array.')
    }

    const [lat, lon] = data.position
    data.position = `SRID=4326; POINT(${lon} ${lat})`
  }
}

export default async function() {
  const devices = new DeviceService({
    model: Device,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('devices/nearby', nearby)
  this.use('devices', devices)

  this.service('devices').hooks({
    before: {
      create: [
        convertGeometry,
        local.hooks.hashPassword({passwordField: 'password'}),
      ],
    },
    after: {
      all: [local.hooks.protect('password')],
    },
  })

  Processor(this)
}

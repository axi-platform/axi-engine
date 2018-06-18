import {Service} from 'feathers-objection'

import Device from './model'
import hooks from './hooks'

import nearby from './nearby'
import Processor from './processor'

export default async function() {
  const devices = new Service({
    model: Device,
    paginate: {
      default: 20,
      max: 100,
    },
  })

  this.use('devices/nearby', nearby)
  this.use('devices', devices)

  this.service('devices').hooks(hooks)

  Processor(this)
}

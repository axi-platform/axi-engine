import Service from '../common/objection'

import Device from './model'
import hooks from './hooks'

import nearby from './nearby'
import Processor from './processor'

export default async function() {
  const devices = new Service({
    Model: Device,
    paginate: {
      default: 20,
      max: 100,
    },
    eager: 'queues(remaining)',
    allowedEager: 'queues',
    namedEagerFilters: {
      remaining: q => q.where('status', 'idle').orWhere('status', 'processing'),
    },
  })

  this.use('devices/nearby', nearby)
  this.use('devices', devices)

  this.service('devices').hooks(hooks)

  Processor(this)
}

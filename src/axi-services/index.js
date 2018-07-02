import Service from '../common/objection'

import Model from './model'

export default async function() {
  const services = new Service({
    Model: Model,
    eager: 'devices',
    allowedEager: 'devices',
  })

  this.use('services', services)
}

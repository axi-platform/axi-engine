import {Service} from 'feathers-objection'

import Model from './model'

class ServiceManager extends Service {
  async find() {
    return Model.query().eager('devices')
  }
}

export default async function() {
  const services = new ServiceManager({
    model: Model,
    allowedEager: 'devices',
  })

  this.use('services', services)
}

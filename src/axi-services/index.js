import Service from '../common/objection'

import Model from './model'

class ServiceManager extends Service {
  async find() {
    return Model.query().eager('devices')
  }
}

export default async function() {
  const services = new ServiceManager({
    Model: Model,
    allowedEager: 'devices',
  })

  this.use('services', services)
}

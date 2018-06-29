import Model from '../common/model'

import Device from '../devices/model'

export default class Service extends Model {
  static tableName = 'services'

  static relationMappings = {
    devices: {
      relation: Model.HasManyRelation,
      modelClass: Device,
      join: {
        from: 'services.id',
        to: 'devices.serviceId',
      },
    },
  }
}

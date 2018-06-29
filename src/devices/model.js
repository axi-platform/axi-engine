import Model from '../common/model'

import Queue from '../queue/model'

export default class Device extends Model {
  static tableName = 'devices'

  static jsonSchema = {required: ['name', 'displayName', 'password']}

  static relationMappings = {
    queues: {
      relation: Model.HasManyRelation,
      modelClass: Queue,
      join: {
        from: 'devices.id',
        to: 'queues.deviceId',
      },
    },
  }
}

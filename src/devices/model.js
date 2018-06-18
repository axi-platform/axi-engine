import Model from '../common/model'

export default class Device extends Model {
  static tableName = 'devices'

  static jsonSchema = {required: ['name', 'displayName', 'password']}
}

import Model from '../common/model'

export default class Project extends Model {
  static tableName = 'projects'

  static jsonSchema = {
    required: ['name', 'displayName', 'description', 'color', 'icon'],
  }
}

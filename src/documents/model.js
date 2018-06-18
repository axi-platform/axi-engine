import Model from '../common/model'

export default class Document extends Model {
  static tableName = 'documents'

  static jsonSchema = {required: ['name', 'file']}
}

import knex, {Model} from '../common/knex'

export default class User extends Model {
  static tableName = 'users'

  static jsonSchema = {required: ['email', 'username', 'password']}
}

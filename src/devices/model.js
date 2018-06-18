import knex, {Model} from '../common/knex'

export default class Device extends Model {
  static tableName = 'devices'

  static jsonSchema = {required: ['name', 'displayName', 'password']}
}

// prettier-ignore
export async function createSchema() {
  const exist = await knex.schema.hasTable('devices')

  if (!exist) {
    await knex.schema.createTable('devices', t => {
      t.increments('id').primary()
      t.string('name').unique().notNullable()
      t.string('display_name').notNullable()
      t.string('password').notNullable()
      t.enum('presence', ['online', 'offline']).defaultTo('offline')
      t.specificType('position', 'geometry(point, 4326)')
      t.timestamps()
    })
  }
}

createSchema()

import {Model} from 'objection'

import knex from '../common/knex'

export default class User extends Model {
  static tableName = 'users'

  static jsonSchema = {required: ['email', 'username', 'password']}
}

// prettier-ignore
export async function createSchema() {
  const exist = await knex.schema.hasTable('users')

  if (!exist) {
    await knex.schema.createTable('users', t => {
      t.increments('id').primary()
      t.string('email').unique().notNullable()
      t.string('username').unique().notNullable()
      t.string('password').notNullable()
      t.string('permissions').defaultsTo('user:*')
    })
  }
}

createSchema()

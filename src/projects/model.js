import {Model} from 'objection'

import knex from '../common/knex'

export default class Project extends Model {
  static tableName = 'projects'

  static jsonSchema = {
    required: ['name', 'displayName', 'description', 'color', 'icon'],
  }
}

// prettier-ignore
export async function createSchema() {
  const exist = await knex.schema.hasTable('projects')

  if (!exist) {
    await knex.schema.createTable('projects', t => {
      t.increments('id').primary()
      t.string('name').unique().notNullable()
      t.string('displayName').notNullable()
      t.string('description').notNullable()
      t.string('color').notNullable()
      t.string('icon').notNullable()
    })
  }
}

createSchema()

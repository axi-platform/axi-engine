import Knex from 'knex'
import KnexPostgis from 'knex-postgis'
import {Model, knexSnakeCaseMappers} from 'objection'

import {database} from './config'

// Initialize Knex Instance
const knex = Knex({
  client: 'pg',
  connection: database,
  ...knexSnakeCaseMappers(),
})

// Initialize PostGIS for Knex
export const postgis = KnexPostgis(knex)

// Tagged Template Literal to execute SQL statements
export const sql = (strings, ...values) => knex.raw(strings.join('?'), values)

// Initialize Objection with Knex Instance
Model.knex(knex)

// Exports Custom Base Model for Objection
export Model from './model'

// Exports Objection Relation Helper
export Relation from './relation'

export default knex

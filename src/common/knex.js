import Knex from 'knex'
import {Model} from 'objection'

import {database} from 'config'

const knex = Knex({
  client: 'pg',
  connection: {
    ...database,
    user: database.username,
  },
})

Model.knex(knex)

export default knex

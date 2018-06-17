import knex from 'knex'
import {database} from 'config'

const pg = knex({
  client: 'pg',
  connection: {
    ...database,
    user: database.username,
  },
})

export default pg

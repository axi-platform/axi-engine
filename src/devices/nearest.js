import {NotFound} from 'feathers-errors'

import knex from '../common/knex'

const sql = x => x.join('')

const query = sql`
  SELECT *
  FROM (
    SELECT id, name, position, "displayName",
      6371 * acos(
        cos(radians(?)) *
        cos(radians(ST_X(position))) *
        cos(radians(?) - radians(ST_Y(position))) +
        sin(radians(?)) *
        sin(radians(ST_X(position)))
      ) AS distance
    FROM devices
  ) AS d
  WHERE distance < 50
`

async function nearest({query: {lat, lon}}) {
  const {rows} = await knex.raw(query, [lat, lon, lat])

  // Notify that there aren't any available print shops nearby.
  if (!rows || rows.length < 1) {
    throw new NotFound("There aren't any nearby print shops right now.")
  }

  return {data: rows[0]}
}

export default {find: nearest}

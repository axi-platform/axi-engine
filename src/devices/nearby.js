import {NotFound} from '@feathersjs/errors'

import knex from '../common/knex'

const sql = x => x.join('')

const query = sql`
  SELECT *
  FROM (
    SELECT id, name,
      ST_X(position) AS longitude,
      ST_Y(position) AS latitude,
      display_name AS "displayName",
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
  LIMIT 10
`

async function nearby({query: {lat, lon}}) {
  const {rows} = await knex.raw(query, [lon, lat, lon])

  // Notify that there aren't any available print shops nearby.
  if (!rows || rows.length < 1) {
    throw new NotFound("There aren't any nearby print shops right now.")
  }

  return {data: rows}
}

export default {find: nearby}

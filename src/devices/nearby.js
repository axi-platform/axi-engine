import {NotFound} from '@feathersjs/errors'

import knex from '../common/knex'

const sql = x => x.join('')

const query = sql`
  SELECT *
  FROM (
    SELECT id, name, longitude, latitude, presence,
      display_name AS "displayName",
      6371000 * acos(
        cos(radians(?)) *
        cos(radians(latitude)) *
        cos(radians(?) - radians(longitude)) +
        sin(radians(latitude)) *
        sin(radians(?))
      ) AS distance
    FROM devices
  ) AS d
  WHERE distance < 10000 AND presence = 'online'
  ORDER BY distance
  LIMIT 10
`

async function nearby({query: {lat, lon}}) {
  const {rows} = await knex.raw(query, [lat, lon, lat])

  // Notify that there aren't any available print shops nearby.
  if (!rows || rows.length < 1) {
    throw new NotFound('ไม่พบร้านปรินท์ที่์ใกล้เคียงในขณะนี้')
  }

  return {data: rows}
}

export default {find: nearby}

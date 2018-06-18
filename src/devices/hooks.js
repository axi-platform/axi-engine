import local from '@feathersjs/authentication-local'
import errors from 'feathers-errors'

async function convertGeometry(ctx) {
  const {data} = ctx

  if (data.position) {
    if (!Array.isArray(data.position)) {
      throw new errors.BadRequest('Position must be a [lat, lon] array.')
    }

    const [lat, lon] = data.position
    data.position = `SRID=4326; POINT(${lon} ${lat})`
  }
}

export default {
  before: {
    create: [
      convertGeometry,
      local.hooks.hashPassword({passwordField: 'password'}),
    ],
  },
  after: {
    all: [local.hooks.protect('password')],
  },
}

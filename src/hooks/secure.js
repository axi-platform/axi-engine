import auth from '@feathersjs/authentication'
import {Forbidden} from '@feathersjs/errors'

import ac from '../common/acl'

const authenticate = auth.hooks.authenticate(['jwt', 'local'])

function checkAllowed(entity, method, path) {
  let can = {}
  let result = {}

  try {
    can = ac.can(entity)

    if (method === 'find' || method === 'get') {
      result = can.readAny(path)
    }

    if (method === 'create') {
      result = can.createAny(path)
    }

    if (method === 'update' || method === 'patch') {
      result = can.updateAny(path)
    }

    if (method === 'remove') {
      result = can.removeAny(path)
    }
  } catch (err) {
    return false
  }

  return !!result.granted
}

async function secure(ctx) {
  await authenticate(ctx)

  const {path, method} = ctx
  const {provider, user} = ctx.params

  const permissions = user.permissions.split(',').map(p => p.split(':'))

  if (!provider) return

  const results = permissions
    .map(([entity, action]) => checkAllowed(entity, method, path))
    .filter(x => x)

  if (results.length === 0) {
    const msg = `insufficient permissions to ${method} ${path}`

    throw new Forbidden(msg)
  }
}

export default secure

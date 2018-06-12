import auth from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'

const authenticate = auth.hooks.authenticate(['jwt', 'local'])

const authorize = (...roles) => {
  const check = checkPermissions({roles})

  return async ctx => {
    await authenticate(ctx)

    return check(ctx)
  }
}

export default authorize

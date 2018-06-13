import UserService from './user'

async function vhost({ip, username, vhost}) {
  console.log('rabbit-auth/vhost', ip, username, vhost)

  return 'allow'
}

async function resource({username, vhost, resource, name, permission}) {
  console.log('rabbit-auth/resource', username, name, resource, permission)

  return 'allow'
}

// prettier-ignore
async function topic({username, vhost, resource, name, permission, routing_key: key}) {
  console.log('rabbit-auth/topic', username, name, resource, permission, key)

  return 'allow'
}

function plain(req, res) {
  res.status(200)
  res.format({'text/plain': () => res.end(res.data)})
}

export default async function rabbitAuth() {
  // Registers rabbit-auth services
  const use = (path, handler) =>
    this.use(`rabbit-auth/${path}`, {create: handler}, plain)

  this.use('rabbit-auth/user', new UserService(), plain)

  use('vhost', vhost)
  use('resource', resource)
  use('topic', topic)
}

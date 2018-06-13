class User {
  async create({username, password}) {
    console.log('rabbit-auth/user', username, password)

    return 'allow'
  }
}

class VHost {
  async create({ip, username, vhost}) {
    console.log('rabbit-auth/vhost', ip, username, vhost)

    return 'allow'
  }
}

class Resource {
  async create({username, vhost, resource, name, permission}) {
    console.log('rabbit-auth/resource', username, name, resource, permission)

    return 'allow'
  }
}

class Topic {
  async create({username, vhost, resource, name, permission, routing_key}) {
    // prettier-ignore
    console.log('rabbit-auth/topic', username, name, resource, permission, routing_key)

    return 'allow'
  }
}

function plain(req, res) {
  res.status(200)
  res.format({'text/plain': () => res.end(res.data)})
}

export default async function rabbitAuth() {
  // Registers rabbit-auth services
  const use = (path, Service) =>
    this.use(`rabbit-auth/${path}`, new Service(), plain)

  use('user', User)
  use('vhost', VHost)
  use('resource', Resource)
  use('topic', Topic)
}

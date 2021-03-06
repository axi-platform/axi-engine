import {compare} from 'bcrypt-promised'

async function verifyUser(app, name, password) {
  const Device = app.service('devices')

  // prettier-ignore
  const {data: [device]} = await Device.find({
    query: {
      $limit: 1,
      name,
    },
  })

  if (!device) {
    throw new Error(`Device ${name} not found.`)
  }

  await compare(password, device.password)
}

export default class UserService {
  setup(app) {
    this.app = app
  }

  async create({username, password}) {
    // TODO: Use proper authentication for internal queue
    if (username === 'guest' && password === 'guest') {
      return 'allow'
    }

    try {
      await verifyUser(this.app, username, password)
      this.app.info(`[amqp-auth] Access Granted for ${username}.`)

      return 'allow'
    } catch (err) {
      this.app.warn(`[amqp-auth] Access Denied for ${username}: ${err.message}`)

      return 'deny'
    }
  }
}

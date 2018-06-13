import {compare} from 'bcrypt-promised'
import {rabbitmq as rmq} from 'config'

import logger from '../../core/logger'

async function verifyUser(app, name, password) {
  const Device = app.service('devices')

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
    if (username === rmq.username && password === rmq.password) {
      return 'allow'
    }

    try {
      await verifyUser(this.app, username, password)
      logger.info(`[amqp-auth] Device ${username} has authenticated.`)

      return 'allow'
    } catch (err) {
      logger.warn(`[amqp-auth] Error: ${err.message}`)

      return 'deny'
    }
  }
}

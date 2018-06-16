import amqplib from 'amqplib'
import retry from 'retry'

import {amqp} from 'config'

import logger from './logger'

let connection = amqplib.connect(amqp)

// Serializers
const pack = data => Buffer.from(JSON.stringify(data))

const unpack = data => {
  try {
    return JSON.parse(data.toString())
  } catch (err) {
    return data.toString()
  }
}

// Retrieves the connection
function Connection() {
  const operation = retry.operation({
    retries: 5,
    factor: 1.5,
    minTimeout: 800,
    maxTimeout: 6 * 1000,
    randomize: true,
  })

  return new Promise((resolve, reject) => {
    operation.attempt(async attempt => {
      try {
        if (!connection || attempt > 1) {
          connection = amqplib.connect(amqp)
        }

        const conn = await connection
        conn.once('error', handleError)

        return resolve(conn)
      } catch (err) {
        logger.warn(`AMQP Conn Error: ${err.message}, attempt ${attempt}.`)

        if (!operation.retry(err)) {
          return reject(err)
        }
      }
    })
  })
}

async function handleError(err) {
  logger.error(`Fatal AMQP Error: ${err.message}`)

  connection = null
}

// Publisher
export async function send(exchange, key, data) {
  const conn = await Connection()
  const chan = await conn.createChannel()
  const message = pack(data)

  chan.assertExchange(exchange, 'topic', {durable: true})

  return chan.publish(exchange, key, message)
}

// Consumer
export async function consume(exchange, key, handle) {
  const conn = await Connection()
  const chan = await conn.createChannel()

  chan.assertExchange(exchange, 'topic', {durable: true})
  chan.prefetch(1)

  const {queue} = await chan.assertQueue('', {exclusive: true})
  chan.bindQueue(queue, exchange, key)

  async function handler(message) {
    const {content, ...meta} = message

    try {
      const data = unpack(content)
      await handle(data, meta.fields.routingKey, meta, chan)

      return chan.ack(message)
    } catch (err) {
      return chan.nack(message)
    }
  }

  return chan.consume(queue, handler, {persistent: true})
}

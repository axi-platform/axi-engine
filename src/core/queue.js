import amqplib from 'amqplib'

const open = amqplib.connect('amqp://localhost')

// Serializers
const pack = data => Buffer.from(JSON.stringify(data))

const unpack = data => {
  try {
    return JSON.parse(data.toString())
  } catch (err) {
    return data.toString()
  }
}

async function Channel() {
  const conn = await open

  return conn.createChannel()
}

// Publisher
export async function send(exchange, key, data) {
  const chan = await Channel()
  const message = pack(data)

  chan.assertExchange(exchange, 'topic', {durable: true})

  return chan.publish(exchange, key, message)
}

// Consumer
export async function consume(exchange, key, handle) {
  const chan = await Channel()

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

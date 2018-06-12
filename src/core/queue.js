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

// Publisher
export async function send(exchange, key, data) {
  const conn = await open
  const ch = await conn.createChannel()
  const message = pack(data)

  ch.assertExchange(exchange, 'topic', {durable: true})

  return ch.publish(exchange, key, message)
}

// Consumer
export async function consume(exchange, key, handle) {
  const conn = await open
  const ch = await conn.createChannel()

  ch.assertExchange(exchange, 'topic', {durable: true})
  ch.prefetch(1)

  const {queue} = await ch.assertQueue('', {exclusive: true})
  ch.bindQueue(queue, exchange, key)

  async function handler(message) {
    const {content, ...meta} = message
    const data = unpack(content)

    await handle(data, meta.fields.routingKey, meta)

    return ch.ack(message)
  }

  return ch.consume(queue, handler, {persistent: true})
}

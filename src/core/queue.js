import amqplib from 'amqplib'
import msgpack from 'msgpack'

const open = amqplib.connect('amqp://localhost')

// Publisher
export async function send(exchange, key, data) {
  const conn = await open
  const ch = await conn.createChannel()
  const message = msgpack.pack(data)

  ch.assertExchange(exchange, 'topic', {durable: false})

  return ch.publish(exchange, key, message)
}

// Consumer
export async function consume(exchange, key, handle) {
  const conn = await open
  const ch = await conn.createChannel()

  ch.assertExchange(exchange, 'topic', {durable: false})
  ch.prefetch(1)

  const {queue} = await ch.assertQueue('', {exclusive: true})
  console.log('[>] Queue name:', queue)

  ch.bindQueue(queue, exchange, key)

  async function handler(message) {
    const {content, ...meta} = message
    const data = msgpack.unpack(content)

    await handle(data, meta.fields.routingKey, meta)

    return ch.ack(message)
  }

  return ch.consume(queue, handler)
}

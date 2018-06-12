import amqplib from 'amqplib'
import msgpack from 'msgpack'

const open = amqplib.connect('amqp://localhost')

// Publisher
export async function send(exchange, data) {
  const conn = await open
  const ch = await conn.createChannel()
  const message = msgpack.pack(data)

  await ch.assertExchange(exchange, 'fanout', {durable: false})

  return ch.publish(exchange, '', message)
}

// Consumer
export async function consume(exchange, handle) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertExchange(exchange, 'fanout', {durable: false})

  const {queue} = await ch.assertQueue('', {exclusive: true})
  console.log('[>] Queue name:', queue)

  ch.bindQueue(queue, exchange, '')

  async function handler(message) {
    const {content, ...meta} = message
    await handle(msgpack.unpack(content), meta)
  }

  return ch.consume(queue, handler, {noAck: true})
}

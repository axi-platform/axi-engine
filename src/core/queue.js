import amqplib from 'amqplib'
import msgpack from 'msgpack'

const open = amqplib.connect('amqp://localhost')

// Publisher
export async function send(queue, data) {
  const conn = await open
  const ch = await conn.createChannel()
  const message = msgpack.pack(data)

  await ch.assertQueue(queue, {durable: true})

  return ch.sendToQueue(queue, message, {persistent: true})
}

// Consumer
export async function consume(queue, handle) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertQueue(queue, {durable: true})

  ch.prefetch(1)

  async function handler(message) {
    const {content, ...meta} = message
    await handle(msgpack.unpack(content), meta)

    ch.ack(message)
  }

  return ch.consume(queue, handler)
}

import amqplib from 'amqplib'
import msgpack from 'msgpack'

const open = amqplib.connect('amqp://localhost')

// Publisher
export async function send(queue, data) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertQueue(queue, {durable: false})

  return ch.sendToQueue(queue, msgpack.pack(data))
}

// Consumer
export async function consume(queue, handler) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertQueue(queue, {durable: false})

  return ch.consume(queue, ({content, ...meta}) => {
    handler(msgpack.unpack(content), meta)
  })
}

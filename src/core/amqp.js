import amqplib from 'amqplib'

const open = amqplib.connect('amqp://localhost')

// Publisher
export async function send(queue, data) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertQueue(queue, {durable: false})

  const message = Buffer.from(data)

  return ch.sendToQueue(queue, message)
}

// Consumer
export async function consume(queue, handler) {
  const conn = await open
  const ch = await conn.createChannel()

  await ch.assertQueue(queue, {durable: false})

  return ch.consume(queue, handler)
}

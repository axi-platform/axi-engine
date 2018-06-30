import redis from '../common/redis'

class QueueManager {
  events = ['completed', 'canceled', 'failed', 'next']

  setup(app) {
    this.app = app
    this.devices = app.service('devices')
  }

  async find({query}) {
    const {device} = query
    const q = `queue:${device}`

    if (!device) {
      throw new Error('Device Field are required in the query.')
    }

    const total = await redis.llen(q)
    const completed = await redis.get(`${q}:completed`)
    const data = await redis.lrange(q)

    return {total, completed, data}
  }

  async get({id, device}) {
    const q = `queue:${device}`

    const queue = await redis.lindex(q)
    const completed = await redis.get(`${q}:completed`)

    return {
      completed,
      data: JSON.parse(queue),
    }
  }

  async create({device, data = {}}) {
    const q = `queue:${device}`

    // Increment Queue total
    const total = await redis.llen(q)
    const completed = await redis.get(`${q}:completed`)
    const remaining = total - completed

    // Set Queue Data
    const id = total
    const queue = `queue:${device}`
    await redis.set(queue, JSON.stringify(data))

    // Update Queue Counter in the Devices Model
    await this.devices.patch(device, {queue: total})

    console.log(`[Count] Remaining: ${remaining}, Completed: ${completed}`)

    // Emits `next` to notify this queue immediately..
    if (remaining <= 1) {
      await this.patch(device, {status: 'next'}).then(console.log)
      console.log(`[Next] No Prior Queues; Notifying #${id} to be next.`)
    }

    console.log(`Queue #${id} created for ${queue}`)

    return {id, remaining}
  }

  async patch(id, {status, device}) {
    if (this.events.indexOf(status) < 0) {
      throw new Error('Queue State is invalid.')
    }

    // Emits `next` to notify a queue.
    if (status === 'next') {
      await this.emit('next', {id, device})
      return {id, device, status}
    }

    const isCompleted = await redis.get(`queue:${device}:${id}:completed`)

    if (isCompleted) {
      throw new Error(`Queue #${id} had been completed already!`)
    }

    // Emits the event back
    this.emit(status, {id, device})

    // Mark in Redis as Completed
    await redis.set(`queue:${device}:completed`, 'true')

    // Increment the Completed ID
    const completed = await redis.incr(`queue:${device}:completed`)

    // Total Queues
    const total = await redis.get(`queue:${device}:total`)

    // Update Remaining Queue Count in the Device Display
    try {
      if (total - completed >= 0) {
        await this.devices.patch(device, {queue: total - completed})
      }
    } catch (e) {
      console.log('warn', "[Queue] Count can't be persisted,")
    }

    // Calling the Next Queue in line.
    this.emit('next', {id: id + 1, device})

    console.log('info', `[Queue] Marked ${id} as ${status}.`)

    return {id, device, status}
  }
}

export default function queues() {
  this.use('queue', new QueueManager())
}

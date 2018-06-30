import Queue from './model'
import QueueProcessor from './processor'

import {send} from '../common/rabbit'
import Service from '../common/objection'

const doneStatus = ['completed', 'failed', 'canceled']
const statuses = ['idle', 'processing', ...doneStatus]

// Check if the entire queue is empty
async function isQueueEmpty(device) {
  const q = Queue.query().where('deviceId', device)

  // Retrieve the `idle` and `processing` queue count
  const [idle] = await q.where('status', 'idle').count('id')
  const [processing] = await q.where('status', 'processing').count('id')

  return idle.count === '0' && processing.count === '0'
}

class QueueService extends Service {
  async setup(app) {
    this.app = app
    this.devices = app.service('devices')
  }

  // Process the queues
  async process(device, {id, data}) {
    console.log('Processing Queue:', id, data)

    // Retrieve the service ID of the device
    const {serviceId} = await this.devices.get(device)

    // Update the queue status to `processing`
    await this.patch(id, {status: 'processing'})

    // Send the queue data to the device via MQTT
    await send('amq.topic', `queue.${serviceId}.${device}.${id}.create`, data)
  }

  // Query the next queue in line and process it
  async next(device) {
    const [queue] = await Queue.query()
      .where('deviceId', device)
      .where('status', 'idle')
      .orderBy('id', 'desc')
      .limit(1)

    // If the queue does exist, process the queue
    if (queue) {
      await this.process(device, queue)
    }
  }

  async create(data, params) {
    const shouldProceed = await isQueueEmpty(data.deviceId)
    const queue = await super.create(data, params)

    // If there is no more queues in line, process it right away.
    if (shouldProceed) {
      await this.process(data.deviceId, queue)
    }

    return queue
  }

  async patch(id, data, params) {
    const {status} = data
    const queue = await super.patch(id, data, params)

    // If the previous queue is finished, call the next queue.
    if (doneStatus.includes(status)) {
      await this.next(queue.deviceId)
    }

    return queue
  }
}

// HACK: Force the device service to update its queue counter!
async function forceUpdate(ctx) {
  if (ctx.result) {
    const devices = ctx.app.service('devices')

    await devices.patch(ctx.result.deviceId, {})
  }
}

export default async function() {
  const queues = new QueueService({
    Model: Queue,
    events: statuses,
  })

  this.use('queues', queues)

  await QueueProcessor(this)

  this.service('queues').hooks({
    after: {
      create: [forceUpdate],
      update: [forceUpdate],
      patch: [forceUpdate],
      remove: [forceUpdate],
    },
  })
}

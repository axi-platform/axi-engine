import {Service} from 'feathers-objection'

import Queue from './model'

import {send} from '../common/rabbit'

class QueueManager extends Service {
  async patch(id, data, params) {
    const {status} = data
    const queue = await super.patch(id, data, params)

    if (status === 'completed' || status === 'next') {
      await this.next(queue)
    }

    return queue
  }

  async next(prevQueue) {
    const {service, device} = prevQueue

    const [queue] = await Queue.query()
      .where('service', service)
      .where('device', device)
      .where('status', 'idle')
      .orderBy('id', 'desc')
      .limit(1)

    console.log('Next Queue is', queue)

    this.emit('next', {data: queue})
    await send('amq.topic', `queue.${service}.${device}.next`, queue)
  }
}

export default async function() {
  const queues = new QueueManager({
    model: Queue,
    events: ['next'],
  })

  this.use('queues', queues)
}

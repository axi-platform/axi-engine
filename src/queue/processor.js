import {consume} from '../common/rabbit'

export default async function QueueProcessor(app) {
  const queues = app.service('queues')

  async function onQueueCompleted(data, key) {
    const [id] = key.split('.').slice(3)
    const queue = await queues.patch(id, {status: 'completed'})

    console.log('Queue Completed:', queue)
  }

  await consume('amq.topic', 'queue.#.completed', onQueueCompleted)
}

import {send, consume} from '../core/queue'

export class QueueService {
  async setup(app) {
    this.app = app

    await consume('queues', 'internal.#', this.handleInternalQueue)
    await consume('queues', 'axi.#', this.handleAxiQueue)
  }

  async find() {
    return {status: 'ACTIVE'}
  }

  async create({service, data}) {
    try {
      const result = await send('queues', service, data)

      return {status: 'QUEUED', data, result}
    } catch (error) {
      return {status: 'ERROR', error}
    }
  }

  handleInternalQueue(data, key) {
    console.log('[> Internal Queue]', key, data)
  }

  handleAxiQueue(data, key) {
    console.log('[> Axi Queue]', key, data)
  }
}

export default function seating() {
  this.use('queue', new QueueService())

  // this.service('queue').hooks(hooks)
}
